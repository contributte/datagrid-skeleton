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

	public function beforeRender(): void
	{
		$reflector = new \ReflectionClass($this);

		$this->getTemplate()->presenterFile = pathinfo((string) $reflector->getFileName(), PATHINFO_FILENAME);
		$this->getTemplate()->presenterDir = basename(dirname((string) $reflector->getFileName()));
		$this->getTemplate()->gitRevision = trim((string) shell_exec('git rev-parse HEAD'));
	}

}
