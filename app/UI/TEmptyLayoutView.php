<?php declare(strict_types = 1);

namespace App\UI;

use Nette\Application\UI\Presenter;

/**
 * @mixin Presenter
 */
trait TEmptyLayoutView
{

	/** @persistent */
	public bool $inFrame;

	public function renderDefault(): void
	{
		$request = $this->getRequest();

		if ($request !== null && $request->getParameter('inFrame') === true) {
			$this->setLayout(__DIR__ . '/../templates/@layout.inFrame.latte');
		}
	}

}
