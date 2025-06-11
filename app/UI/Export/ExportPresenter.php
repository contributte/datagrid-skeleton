<?php declare(strict_types = 1);

namespace App\UI\Export;

use App\UI\AbstractPresenter;
use Ublaboo\DataGrid\Column\ColumnText;
use Ublaboo\DataGrid\DataGrid;

final class ExportPresenter extends AbstractPresenter
{

	public function createComponentGrid(): DataGrid
	{
		$grid = new DataGrid();

		$grid->setDataSource($this->dibiConnection->select('*')->from('users'));

		$grid->setItemsPerPageList([20, 50, 100]);

		$grid->addColumnNumber('id', 'Id')
			->setAlign('start')
			->setSortable();

		$grid->addColumnText('name', 'Name')
			->setSortable()
			->setFilterText();

		$grid->addColumnDateTime('birth_date', 'Birthday');

		$grid->addColumnText('status', 'Status');

		$grid->addExportCallback('Dump to ajax rq', function (array $rows, DataGrid $grid): void {
			echo 'All fetched data were passed to export callback. Size of data: ';
			echo count($rows);
			die;
		})->setAjax();

		$grid->addExportCsvFiltered('Csv export (filtered)', 'examples.csv')
			->setTitle('Csv export (filtered)');

		$columnName = new ColumnText($grid, 'name', 'name', 'Name');
		$columnEven = (new ColumnText($grid, 'even', 'even', 'Even ID (yes/no)'))
			->setRenderer(
				fn ($item) => $item['id'] % 2 === 0 ? 'No' : 'Yes'
			);

		$grid->addExportCsv('Csv export', 'examples-all.csv')
			->setTitle('Csv export')
			->setColumns([
				$columnName,
				$columnEven,
			]);

		$grid->addExportExcel('Excel export', 'examples-all.xlsx')
			->setTitle('Excel export')
			->setColumns([
				$columnName,
				$columnEven,
			]);

		return $grid;
	}

}
