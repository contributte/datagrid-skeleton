<?php declare(strict_types = 1);

namespace App\UI\ColumnsSummary;

use App\UI\AbstractPresenter;
use Contributte\Datagrid\Datagrid;

final class ColumnsSummaryPresenter extends AbstractPresenter
{

	public function createComponentGrid(): Datagrid
	{
		$grid = new DataGrid();

		$grid->setDataSource($this->dibiConnection->select('*')->from('users'));

		$grid->setItemsPerPageList([20, 50, 100], true);

		$grid->addColumnNumber('id', 'Id')
			->setAlign('start')
			->setSortable();

		$grid->addColumnText('name', 'Name')
			->setSortable()
			->setFilterText();

		$grid->addColumnNumber('countries_visited', 'Countries Visited')
			->setFormat(0, '.', ',')
			->setSortable();

		$grid->addColumnText('status', 'Status');

		// Columns summary - shows sum in footer row for specified columns
		$columnsSummary = $grid->setColumnsSummary(['id', 'countries_visited']);
		$columnsSummary->setFormat('id', 0, '.', ' ');
		$columnsSummary->setFormat('countries_visited', 0, '.', ',');

		return $grid;
	}

}
