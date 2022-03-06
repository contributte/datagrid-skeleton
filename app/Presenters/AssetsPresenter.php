<?php declare(strict_types = 1);

namespace App\Presenters;

use App\Model\Parameters;
use Nette\Application\Responses\CallbackResponse;
use Nette\Application\UI\Presenter;
use Nette\Http\IRequest;
use Nette\Http\IResponse;
use Nette\Utils\FileSystem;

final class AssetsPresenter extends Presenter
{

	/** @var Parameters @inject */
	public Parameters $parameters;

	public function actionCss(string $file): void
	{
		$this->sendResponse(new CallbackResponse(function (IRequest $request, IResponse $response) use ($file): void {
			$response->addHeader('content-type', 'text/css; charset=utf-8');
			echo FileSystem::read($this->parameters->get('vendorDir') . '/ublaboo/datagrid/assets/' . $file);
		}));
	}

	public function actionJs(string $file): void
	{
		$this->sendResponse(new CallbackResponse(function (IRequest $request, IResponse $response) use ($file): void {
			$response->addHeader('content-type', 'application/javascript; charset=utf-8');
			echo FileSystem::read($this->parameters->get('vendorDir') . '/ublaboo/datagrid/assets/' . $file);
		}));
	}

}
