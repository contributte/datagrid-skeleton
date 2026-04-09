<?php declare(strict_types = 1);

namespace App\UI\ItemDetail;

use App\UI\AbstractPresenter;
use Contributte\Datagrid\Datagrid;
use Nette\Utils\Html;

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

		$detail = $grid->setItemsDetail();

		$detail->setTemplateParameters(['customParam' => 'Hello from template parameter!']);

		// Render condition - only show detail toggle for active users
		$detail->setRenderCondition(function ($item): bool {
			return $item['status'] === 'active';
		});

		$grid->setItemsDetailForm(function ($container): void {
			$container->addText('note', 'Note')
				->setRequired('Please enter a note');
			$container->addSubmit('save', 'Save note');
		});

		$grid->setTemplateFile(__DIR__ . '/Templates/grid/item-detail-grid.latte');

		return $grid;
	}

}
