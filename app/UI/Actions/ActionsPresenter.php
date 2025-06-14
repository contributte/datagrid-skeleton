<?php declare(strict_types = 1);

namespace App\UI\Actions;

use App\UI\AbstractPresenter;
use Contributte\Datagrid\Column\Action\Confirmation\StringConfirmation;
use Contributte\Datagrid\Datagrid;

class ActionsPresenter extends AbstractPresenter
{

	public function createComponentGrid(): Datagrid
	{
		$grid = new DataGrid();

		$grid->setDataSource($this->dibiConnection->select('*')->from('users'));

		$grid->setItemsPerPageList([20, 50, 100]);

		$grid->setSortable();

		$grid->addColumnNumber('id', 'Id')
			->setAlign('start')
			->setSortable();

		$grid->addColumnText('name', 'Name')
			->setSortable();

		$multiAction = $grid->addMultiAction('multi_blah', 'MultiAction')
			->addAction('blah', 'Blahblah', 'blah!')
			->addAction('blah2', 'Blahblah2', 'blah!', ['name']);

		$multiAction
			->getAction('blah2')
			->setIcon('check');

		$grid->addAction('blah', 'Blahblah', 'blah!')
			->setClass('btn btn-xs btn-primary ajax');

		$grid->addAction('this', '')
			->setIcon('redo')
			->setClass('btn btn-xs btn-success');

		$actionCallback = $grid->addActionCallback('custom_callback', '');

		$actionCallback
			->setIcon('sun')
			->setTitle('Hello, sun')
			->setClass('btn btn-xs btn-default btn-secondary ajax');

		$actionCallback->onClick[] = function ($itemId): void {
			$this->flashMessage('Custom callback triggered, id: ' . $itemId);
			$this->redrawControl('flashes');
		};

		$grid->addAction('delete', '', 'delete!')
			->setIcon('trash')
			->setTitle('Delete')
			->setClass('btn btn-xs btn-danger')
			->setConfirmation(
				new StringConfirmation('Do you really want to delete example %s?', 'name')
			);

		$grid->addToolbarButton('this', 'Toolbar')->addAttributes(['foo' => 'bar']);
		$grid->addToolbarButton('this#2', 'Button', ['foo' => 'bar']);

		return $grid;
	}

	public function handleSort(): void
	{
		$this->flashMessage('Sorted!');
		$this->redrawControl('flashes');
	}

	public function handleBlah(): void
	{
		$this->flashMessage('Blah');
		$this->redrawControl('flashes');
	}

	public function handleDelete(): void
	{
		$this->flashMessage('Deleted!', 'info');
		$this->redrawControl('flashes');
	}

}
