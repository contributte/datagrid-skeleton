<?php declare(strict_types = 1);

namespace App\UI\Events;

use App\UI\AbstractPresenter;
use Contributte\Datagrid\Datagrid;

final class EventsPresenter extends AbstractPresenter
{

	public function createComponentGrid(): Datagrid
	{
		$grid = new DataGrid();

		$grid->setDataSource($this->dibiConnection->select('*')->from('users'));

		$grid->setItemsPerPageList([20, 50, 100], true);

		$grid->addColumnText('id', 'Id')
			->setSortable();

		$grid->addColumnText('email', 'E-mail')
			->setSortable()
			->setFilterText();

		$grid->addColumnText('name', 'Name')
			->setSortable()
			->setFilterText();

		$grid->addColumnText('status', 'Status');

		$grid->setColumnsHideable();

		// Event: onRedraw - triggered when grid is redrawn
		$grid->onRedraw[] = function () use ($grid): void {
			$grid->getPresenter()->flashMessage('Event: onRedraw triggered', 'info');
		};

		// Event: onRender - triggered when grid is rendered
		$grid->onRender[] = function (Datagrid $grid): void {
			// Useful for modifying grid state before rendering
		};

		// Event: onColumnAdd - triggered when a column is added
		$grid->onColumnAdd[] = function (string $key, $column): void {
			// Useful for modifying columns after they are added
		};

		// Event: onFiltersAssembled - triggered when filters are assembled
		$grid->onFiltersAssembled[] = function (array $filters): void {
			// Useful for modifying filters before they are applied
		};

		// Events: onColumnShow / onColumnHide - triggered when columns visibility changes
		$grid->onColumnShow[] = function (string $column): void {
			// Useful for tracking column visibility
		};

		$grid->onColumnHide[] = function (string $column): void {
			// Useful for tracking column visibility
		};

		return $grid;
	}

}
