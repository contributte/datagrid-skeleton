<?php declare(strict_types = 1);

namespace App\Model;

use Nette\Application\Routers\RouteList;

class RouterFactory
{

	public static function create(): RouteList
	{
		$router = new RouteList();

		$router->addRoute('<presenter>[/<id>]', 'Basic:default');
		$router->addRoute('_datagrid/css/<file>', 'Assets:css');
		$router->addRoute('_datagrid/js/<file>', 'Assets:js');

		return $router;
	}

}
