<?php declare(strict_types = 1);

namespace App\UI;

use Contributte\Datagrid\Datagrid;
use Contributte\Nella\UI\NellaPresenter;
use Dibi\Connection;
use Nette\DI\Attributes\Inject;

abstract class AbstractPresenter extends NellaPresenter
{

	#[Inject]
	public Connection $dibiConnection;

	abstract public function createComponentGrid(): DataGrid;

	public function changeStatus(string $id, string $newStatus): void
	{
		if (in_array($newStatus, ['active', 'inactive', 'deleted'], true)) {
			$data = ['status' => $newStatus];

			$this->dibiConnection->update('users', $data)
				->where('id = ?', $id)
				->execute();
		}

		if ($this->isAjax()) {
			$grid = $this->getComponent('grid');

			$grid->redrawItem($id);
			$this->flashMessage('Status changed');
			$this->redrawControl('flashes');
		} else {
			$this->redirect('this');
		}
	}

}
