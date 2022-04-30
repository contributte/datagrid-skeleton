<?php declare(strict_types = 1);

namespace App\Router;

use Nette\Application\Routers\RouteList;

class RouterFactory
{

	public static function create(): RouteList
	{
		$router = new RouteList();

		$router->addRoute('<presenter>[/<id>]', 'Basic:default');

		return $router;
	}

}
