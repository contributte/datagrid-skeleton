<?php declare(strict_types = 1);

namespace App\Model\Utils;

use DateTimeInterface;
use Nette\Utils\DateTime as NetteDateTime;

class DateTime extends NetteDateTime
{

	public static function fromSafe(string|int|DateTimeInterface|null $time): ?static
	{
		if ($time === null) {
			return null;
		}

		return self::from($time);
	}

}
