<?php declare(strict_types = 1);

namespace App\Model;

use Nette\Application\Routers\Route;
use Nette\Application\Routers\RouteList;

class RouterFactory
{

	public static function create(): RouteList
	{
		$router = new RouteList();

		$router[] = new Route('<presenter>[/<id>]', 'Basic:default');
		$router[] = new Route('_datagrid/css/<file>', 'Assets:css');
		$router[] = new Route('_datagrid/js/<file>', 'Assets:js');

		return $router;
	}

}
