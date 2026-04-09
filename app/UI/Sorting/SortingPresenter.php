<?php declare(strict_types = 1);

namespace App\UI\Sorting;

use App\UI\AbstractPresenter;
use Contributte\Datagrid\Datagrid;
use Dibi\Fluent;

final class SortingPresenter extends AbstractPresenter
{

	public function createComponentGrid(): Datagrid
	{
		$grid = new DataGrid();

		$grid->setDataSource($this->dibiConnection->select('*')->from('users'));

		$grid->setItemsPerPageList([20, 50, 100], true);

		// Enable multi-sort - allows sorting by multiple columns simultaneously
		$grid->setMultiSortEnabled();

		$grid->addColumnText('id', 'Id')
			->setSortable()
			->setSortableResetPagination(); // Reset pagination when sorting changes

		$grid->addColumnText('email', 'E-mail')
			->setSortable()
			->setSortableResetPagination();

		$grid->addColumnText('name', 'Name')
			->setSortable()
			->setSortableResetPagination()
			->setSortableCallback(function (Fluent $fluent, string $sort): void {
				$fluent->orderBy('CHAR_LENGTH(name)', $sort); // Custom sort: by name length
			});

		$grid->addColumnText('status', 'Status')
			->setSortable();

		$grid->setDefaultSort(['name' => 'ASC', 'id' => 'DESC']);

		return $grid;
	}

}
