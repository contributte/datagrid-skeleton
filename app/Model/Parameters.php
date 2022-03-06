<?php declare(strict_types = 1);

namespace App\Model;

final class Parameters
{

	/** @var mixed[] */
	private array $parameters;

	/**
	 * @param mixed[] $parameters
	 */
	public function __construct(array $parameters)
	{
		$this->parameters = $parameters;
	}

	public function get(string $key): mixed
	{
		return $this->parameters[$key];
	}

}
