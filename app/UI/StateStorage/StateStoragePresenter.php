<?php declare(strict_types = 1);

namespace App\UI\StateStorage;

use App\UI\AbstractPresenter;
use Contributte\Datagrid\Datagrid;

final class StateStoragePresenter extends AbstractPresenter
{

	public function createComponentGrid(): Datagrid
	{
		$grid = new DataGrid();

		$grid->setDataSource($this->dibiConnection->select('*')->from('users'));

		$grid->setItemsPerPageList([20, 50, 100], true);

		// Remember grid state (filters, sorting, pagination) across requests
		$grid->setRememberState();

		// Refresh URL with current filter state (history API)
		$grid->setRefreshUrl();

		$grid->addColumnText('id', 'Id')
			->setSortable();

		$grid->addColumnText('email', 'E-mail')
			->setSortable()
			->setFilterText();

		$grid->addColumnText('name', 'Name')
			->setSortable()
			->setFilterText();

		$grid->addColumnText('status', 'Status')
			->setFilterSelect([
				'' => 'All',
				'active' => 'Active',
				'inactive' => 'Inactive',
				'deleted' => 'Deleted',
			]);

		return $grid;
	}

}
