<?php declare(strict_types = 1);

namespace App\UI;

use App\Model\Parameters;
use Contributte\Datagrid\Datagrid;
use Contributte\Nella\UI\NellaPresenter;
use Dibi\Connection;
use Nette\DI\Attributes\Inject;

abstract class AbstractPresenter extends NellaPresenter
{

	#[Inject]
	public Connection $dibiConnection;

	#[Inject]
	public Parameters $parameters;

	abstract public function createComponentGrid(): Datagrid;

	public function beforeRender(): void
	{
		$reflector = new \ReflectionClass($this);

		$this->getTemplate()->presenterFile = pathinfo((string) $reflector->getFileName(), PATHINFO_FILENAME);
		$this->getTemplate()->presenterDir = basename(dirname((string) $reflector->getFileName()));
		$git = $this->parameters->get('git');
		$this->getTemplate()->gitRevision = is_array($git) && isset($git['revision']) ? $git['revision'] : 'dev';
	}

}
