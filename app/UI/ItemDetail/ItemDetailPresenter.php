<?php declare(strict_types = 1);

namespace App\UI\ItemDetail;

use App\UI\AbstractPresenter;
use Contributte\Datagrid\Datagrid;

final class ItemDetailPresenter extends AbstractPresenter
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
			->setFilterText();

		$grid->addColumnDateTime('birth_date', 'Birthday')
			->setFormat('j. n. Y');

		$grid->setItemsDetail();

		$grid->setTemplateFile(__DIR__ . '/Templates/grid/item-detail-grid.latte');

		return $grid;
	}

}
