<?php declare(strict_types = 1);

namespace App\Presenters;

use App\Model\Utils\DateTime;
use App\UI\TEmptyLayoutView;
use Dibi\Row;
use Ublaboo\DataGrid\DataGrid;

final class BasicPresenter extends AbstractPresenter
{

	use TEmptyLayoutView;

	public function createComponentGrid(): DataGrid
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

		$grid->addColumnNumber('age', 'Age')
			->setRenderer(fn (Row $row): ?int => DateTime::fromSafe($row->asDateTime('birth_date'))?->diff(new DateTime())->y);

		return $grid;
	}

}
