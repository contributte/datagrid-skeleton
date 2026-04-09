<?php declare(strict_types = 1);

namespace App\UI\ArrayDatasource;

use App\UI\AbstractPresenter;
use Contributte\Datagrid\Datagrid;

final class ArrayDatasourcePresenter extends AbstractPresenter
{

	public function createComponentGrid(): Datagrid
	{
		$grid = new DataGrid();

		// Array datasource - no database needed
		$data = [
			['id' => 1, 'name' => 'John Doe', 'email' => 'john@example.com', 'age' => 32, 'role' => 'admin'],
			['id' => 2, 'name' => 'Jane Smith', 'email' => 'jane@example.com', 'age' => 28, 'role' => 'user'],
			['id' => 3, 'name' => 'Bob Johnson', 'email' => 'bob@example.com', 'age' => 45, 'role' => 'editor'],
			['id' => 4, 'name' => 'Alice Brown', 'email' => 'alice@example.com', 'age' => 35, 'role' => 'admin'],
			['id' => 5, 'name' => 'Charlie Wilson', 'email' => 'charlie@example.com', 'age' => 22, 'role' => 'user'],
			['id' => 6, 'name' => 'Diana Prince', 'email' => 'diana@example.com', 'age' => 30, 'role' => 'editor'],
			['id' => 7, 'name' => 'Edward Norton', 'email' => 'edward@example.com', 'age' => 41, 'role' => 'user'],
			['id' => 8, 'name' => 'Fiona Apple', 'email' => 'fiona@example.com', 'age' => 38, 'role' => 'admin'],
			['id' => 9, 'name' => 'George Lucas', 'email' => 'george@example.com', 'age' => 55, 'role' => 'user'],
			['id' => 10, 'name' => 'Hannah Montana', 'email' => 'hannah@example.com', 'age' => 19, 'role' => 'user'],
		];

		$grid->setDataSource($data);

		$grid->setItemsPerPageList([5, 10, 20], true);

		// Default per page
		$grid->setDefaultPerPage(5);

		$grid->addColumnNumber('id', 'Id')
			->setAlign('start')
			->setSortable();

		$grid->addColumnText('name', 'Name')
			->setSortable()
			->setFilterText();

		$grid->addColumnText('email', 'E-mail')
			->setSortable()
			->setFilterText();

		$grid->addColumnNumber('age', 'Age')
			->setSortable();

		$grid->addColumnText('role', 'Role')
			->setSortable()
			->setFilterSelect([
				'' => 'All',
				'admin' => 'Admin',
				'user' => 'User',
				'editor' => 'Editor',
			]);

		return $grid;
	}

}
