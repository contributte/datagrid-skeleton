<?php declare(strict_types = 1);

namespace App\UI\Localization;

use App\Model\Utils\DateTime;
use App\UI\AbstractPresenter;
use Contributte\Datagrid\Datagrid;
use Contributte\Datagrid\Localization\SimpleTranslator;
use Dibi\Row;

final class LocalizationPresenter extends AbstractPresenter
{

	public function createComponentGrid(): DataGrid
	{
		$grid = new Datagrid();

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

		$translator = new SimpleTranslator([
			'contributte_datagrid.no_item_found_reset' => 'Žádné položky nenalezeny. Filtr můžete vynulovat',
			'contributte_datagrid.no_item_found' => 'Žádné položky nenalezeny.',
			'contributte_datagrid.here' => 'zde',
			'contributte_datagrid.items' => 'Položky',
			'contributte_datagrid.all' => 'všechny',
			'contributte_datagrid.from' => 'z',
			'contributte_datagrid.reset_filter' => 'Resetovat filtr',
			'contributte_datagrid.group_actions' => 'Hromadné akce',
			'contributte_datagrid.show_all_columns' => 'Zobrazit všechny sloupce',
			'contributte_datagrid.hide_column' => 'Skrýt sloupec',
			'contributte_datagrid.action' => 'Akce',
			'contributte_datagrid.previous' => 'Předchozí',
			'contributte_datagrid.next' => 'Další',
			'contributte_datagrid.choose' => 'Vyberte',
			'contributte_datagrid.execute' => 'Provést',

			'Name' => 'Jméno',
			'Birthday' => 'Narozky',
			'Age' => 'Věk',
		]);

		$grid->setTranslator($translator);

		return $grid;
	}

}
