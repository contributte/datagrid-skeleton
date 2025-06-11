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

	abstract public function createComponentGrid(): Datagrid;

}
