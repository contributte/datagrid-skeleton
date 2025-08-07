<?php declare(strict_types = 1);

namespace App\UI\Columns;

use App\Model\Utils\DateTime;
use App\Model\Utils\Types;
use App\UI\AbstractPresenter;
use Contributte\Datagrid\AggregationFunction\IAggregationFunction;
use Contributte\Datagrid\AggregationFunction\IMultipleAggregationFunction;
use Contributte\Datagrid\Column\ColumnLink;
use Contributte\Datagrid\Column\ColumnStatus;
use Contributte\Datagrid\Datagrid;
use Dibi\Fluent;
use Dibi\Row;
use UnexpectedValueException;

final class ColumnsPresenter extends AbstractPresenter
{

	public function createComponentGrid(): Datagrid
	{
		$grid = new Datagrid();

		$grid->setDefaultSort(['id' => 'ASC']);

		$grid->setDataSource($this->dibiConnection->select('*')->from('users'));

		$grid->setItemsPerPageList([20, 50, 100], true);

		$grid->addColumnText('id', 'Id')
			->setReplacement([
				1 => 'One',
				2 => 'Two',
				3 => 'Trhee',
			])
			->setSortable();

		$grid->addColumnLink('email', 'E-mail', 'this')
			->setSortable();

		$columnStatus = $grid->addColumnStatus('status', 'Status');

		$columnStatus
			->addOption('active', 'Active')
			->endOption()
			->addOption('inactive', 'Inactive')
			->setClass('btn-warning')
			->endOption()
			->addOption('deleted', 'Deleted')
			->setClass('btn-danger')
			->endOption()
			->setSortable();
		$columnStatus->onChange[] = [$this, 'changeStatus'];

		$grid->addColumnText('emojis', 'Emojis (template)')
			->setTemplate(__DIR__ . '/Templates/grid/columnsEmojis.latte');

		$grid->addColumnDateTime('birth_date', 'Birthday')
			->setFormat('j. n. Y')
			->setSortable();

		$grid->addColumnNumber('age', 'Age')
			->setRenderer(fn (Row $row): ?int => DateTime::fromSafe($row->asDateTime('birth_date'))?->diff(new DateTime())->y);

		$grid->setColumnsHideable();

		$grid->addColumnCallback('status', function (ColumnStatus $column, Row $row): void {
			if ($row['id'] === 3) {
				$column->removeOption('active');
			}
		});

		$grid->addColumnCallback('email', function (ColumnLink $column, Row $row): void {
			if ($row['id'] === 3) {
				$column->setRenderer(fn (): string => '');
			}
		});

		$grid->setMultipleAggregationFunction(
			new class implements IMultipleAggregationFunction {

				private int $idsSum = 0;

				private float $avgAge = 0.0;

				public function getFilterDataType(): string
				{
					return IAggregationFunction::DATA_TYPE_PAGINATED;
				}

				public function processDataSource(mixed $dataSource): void
				{
					if (!$dataSource instanceof Fluent) {
						throw new UnexpectedValueException();
					}

					$this->idsSum = Types::forceInt($dataSource->getConnection()
						->select('SUM([id])')
						->from($dataSource, '_')
						->fetchSingle());

					$this->avgAge = round(Types::forceNumber($dataSource->getConnection()
						->select('AVG(YEAR([birth_date]))')
						->from($dataSource, '_')
						->fetchSingle()));
				}

				public function renderResult(string $key): string
				{
					if ($key === 'id') {
						return 'Ids sum: ' . $this->idsSum;
					}

					if ($key === 'age') {
						return 'Avg Age: ' . ((int) date('Y') - $this->avgAge);
					}

					return '';
				}

			}
		);

		return $grid;
	}

	public function changeStatus(string $id, string $newStatus): void
	{
		if (in_array($newStatus, ['active', 'inactive', 'deleted'], true)) {
			$data = ['status' => $newStatus];

			$this->dibiConnection->update('users', $data)
				->where('id = ?', $id)
				->execute();
		}

		if ($this->isAjax()) {
			$grid = $this->getComponent('grid');

			$grid->redrawItem($id);
			$this->flashMessage('Status changed');
			$this->redrawControl('flashes');
		} else {
			$this->redirect('this');
		}
	}

}
