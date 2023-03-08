<?php declare(strict_types = 1);

namespace Tests\Cases\Build;

use App\Bootstrap;
use Contributte\Tester\Toolkit;
use Nette\Application\Application;
use Nette\DI\Container;
use Tester\Assert;

require __DIR__ . '/../../bootstrap.php';

Toolkit::test(static function (): void {
	$container = Bootstrap::boot()->createContainer();
	$container->getByType(Application::class);

	Assert::type(Container::class, $container);
});
