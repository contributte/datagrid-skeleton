<?php declare(strict_types = 1);

namespace App\UI\Cdn;

use App\Model\Utils\DateTime;
use App\UI\AbstractPresenter;
use Contributte\Datagrid\Datagrid;
use Dibi\Fluent;
use Dibi\Row;
use Nette\Utils\ArrayHash;

final class CdnPresenter extends AbstractPresenter
{

	public function createComponentGrid(): Datagrid
	{
		$grid = new DataGrid();
		$grid->setStrictStorageFilterValues(false);

		$grid->setDataSource($this->dibiConnection->select('*')->from('users'));

		$grid->setItemsPerPageList([20, 50, 100], true);

		$grid->addColumnText('id', 'Id')
			->setFilterText()
			->setExactSearch();

		$grid->addColumnText('name', 'Name')
			->setFilterText();

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

		$grid->addColumnStatus('multistatus', 'Multi Status', 'status')
			->setFilterMultiSelect([
				'' => 'All',
				'active' => 'Active',
				'inactive' => 'Inactive',
				'deleted' => 'Deleted',
			]);

		$grid->addColumnDateTime('birth_date', 'Birthday')
			->setFormat('j. n. Y')
			->setSortable()
			->setFilterDate();

		$grid->addColumnDateTime('birth_date_2', 'Birthday 2', 'birth_date')
			->setFormat('j. n. Y')
			->setSortable()
			->setFilterDateRange();

		$grid->addColumnNumber('age', 'Age')
			->setRenderer(fn (Row $row): ?int => DateTime::fromSafe($row->asDateTime('birth_date'))?->diff(new DateTime())->y)
			->setFilterRange()
			->setCondition(function (Fluent $fluent, ArrayHash $values): void {
				if ((bool) $values['from']) {
					$fluent->where('(YEAR(CURDATE()) - YEAR(birth_date)) >= ?', $values['from']);
				}

				if ((bool) $values['to']) {
					$fluent->where('(YEAR(CURDATE()) - YEAR(birth_date)) <= ?', $values['to']);
				}
			});

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
