<?php declare(strict_types = 1);

namespace App\UI\Add;

use App\Model\Utils\DateTime;
use App\UI\AbstractPresenter;
use Ublaboo\DataGrid\DataGrid;

final class AddPresenter extends AbstractPresenter
{

	public function createComponentGrid(): DataGrid
	{
		$grid = new DataGrid();

		$grid->setDataSource($this->dibiConnection->select('*')->from('users'));

		$grid->setItemsPerPageList([20, 50, 100]);

		$grid->addColumnNumber('id', 'Id')
			->setAlign('start')
			->setFilterText();

		$grid->addColumnText('name', 'Name')
			->setFilterText();

		$grid->addColumnStatus('status', 'Status');

		$inlineAdd = $grid->addInlineAdd();

		$inlineAdd->setPositionTop()->onControlAdd[] = function ($container): void {
			$container->addText('name', '')
				->setRequired('aaa');
			$container->addText('birth_date', '');
			$container->addText('link', '');
			$container->addSelect('status', '', [
				'active' => 'Active',
				'inactive' => 'Inactive',
				'deleted' => 'Deleted',
			]);
		};

		$inlineAdd->onSubmit[] = function ($values): void {
			$this->dibiConnection->insert(
				'users',
				[
					'name' => $values['name'],
					'status' => $values['status'],
					'countries_visited' => 1,
					'birth_date' => new DateTime(),
				]
			)->execute();
			$this->flashMessage('Record was added!', 'success');
			$this->redrawControl('flashes');
		};

		return $grid;
	}

}
