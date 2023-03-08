<?php declare(strict_types = 1);

namespace App\Model\Utils;

use InvalidArgumentException;

class Types
{

	public static function forceInt(mixed $input): int
	{
		if (!is_numeric($input)) {
			throw new InvalidArgumentException(sprintf('Expect int, given %s.', gettype($input)));
		}

		return intval($input);
	}

	public static function forceNumber(mixed $input): float|int
	{
		if (!is_numeric($input) || is_string($input)) {
			throw new InvalidArgumentException(sprintf('Expect number, given %s.', gettype($input)));
		}

		return $input;
	}

}
