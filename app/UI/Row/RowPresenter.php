<?php declare(strict_types = 1);

namespace App\UI\Row;

use App\UI\AbstractPresenter;
use Contributte\Datagrid\Column\Action\Confirmation\StringConfirmation;
use Contributte\Datagrid\Datagrid;

final class RowPresenter extends AbstractPresenter
{

	public function createComponentGrid(): Datagrid
	{
		$grid = new DataGrid();

		$grid->setDataSource($this->dibiConnection->select('*')->from('users'));

		$grid->setItemsPerPageList([20, 50, 100]);

		$grid->setRowCallback(function ($item, $tr): void {
			$tr->addClass('super-' . $item->id);
		});

		$grid->addColumnNumber('id', 'Id')
			->setAlign('start')
			->setSortable();

		$grid->addColumnText('name', 'Name')
			->setSortable();

		$grid->addColumnDateTime('birth_date', 'Birthday');

		$grid->addAction('detail', '', 'this')
			->setIcon('sun')
			->setTitle('Detail');

		$grid->addAction('delete', '', 'delete!')
			->setIcon('trash')
			->setTitle('Delete')
			->setClass('btn btn-xs btn-danger ajax')
			->setConfirmation(
				new StringConfirmation('Do you really want to delete example %s?', 'name')
			);

		$grid->addGroupAction('Delete')->onSelect[] = [$this, 'groupDelete'];

		$grid->allowRowsGroupAction(fn ($item): bool => $item->id % 2 === 0);

		$grid->allowRowsAction('delete', fn ($item): bool => $item->id % 3 === 0);

		$grid->allowRowsAction('detail', fn ($item): bool => $item->id % 4 === 0);

		return $grid;
	}

	public function handleDelete(): void
	{
		$this->flashMessage('Deleted!', 'info');
		$this->redrawControl('flashes');
	}

	/**
	 * @param mixed[] $ids
	 */
	public function groupDelete(array $ids): void
	{
		$this->flashMessage(
			sprintf('These items: [%s] are being deleted', implode(',', $ids)),
			'info'
		);

		if ($this->isAjax()) {
			$this->redrawControl('flashes');
			$this['grid']->redrawControl();
		} else {
			$this->redirect('this');
		}
	}

}
