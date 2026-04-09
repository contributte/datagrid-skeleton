<?php declare(strict_types = 1);

namespace App\UI\GroupActions;

use App\UI\AbstractPresenter;
use Contributte\Datagrid\Datagrid;

class GroupActionsPresenter extends AbstractPresenter
{

	public function createComponentGrid(): Datagrid
	{
		$grid = new DataGrid();

		$grid->setDataSource($this->dibiConnection->select('*')->from('users'));

		$grid->setItemsPerPageList([20, 50, 100]);

		$grid->setShowSelectedRowsCount();

		$grid->addColumnNumber('id', 'Id')
			->setAlign('start')
			->setSortable();

		$grid->addColumnText('name', 'Name')
			->setSortable();

		$grid->addColumnText('email', 'E-mail')
			->setSortable();

		$grid->addColumnDateTime('status', 'Status');

		$grid->addGroupAction(
			'Change user status',
			[
				'active' => 'Active',
				'inactive' => 'Inactive',
				'deleted' => 'Deleted',
			]
		)->onSelect[] = [$this, 'groupChangeStatus'];

		$grid->addGroupAction('Send', [
			'john' => 'John',
			'joe' => 'Joe',
			'frank' => 'Frank',
		])->onSelect[] = [$this, 'groupSend'];

		$grid->addGroupTextAction('Add note')->onSelect[] = [$this, 'groupAddNote'];

		$grid->addGroupAction('Delete')->onSelect[] = [$this, 'groupDelete'];

		$grid->addGroupButtonAction('Say hello')->onClick[] = [$this, 'sayHello'];

		$grid->addGroupSelectAction('Move to group', [
			'admins' => 'Admins',
			'users' => 'Users',
			'guests' => 'Guests',
		])->onSelect[] = [$this, 'groupMoveToGroup'];

		$grid->addGroupMultiSelectAction('Assign tags', [
			'php' => 'PHP',
			'js' => 'JavaScript',
			'css' => 'CSS',
		])->onSelect[] = [$this, 'groupAssignTags'];

		$grid->addGroupTextareaAction('Add comment')->onSelect[] = [$this, 'groupAddComment'];

		return $grid;
	}

	/**
	 * @param mixed[] $ids
	 */
	public function groupChangeStatus(array $ids, string $newStatus): void
	{
		$this->flashMessage(
			sprintf(
				'Status of items with id: [%s] was changed to: [%s]',
				implode(',', $ids),
				$newStatus
			),
			'success'
		);

		if ($ids !== []) {
			$data = ['status' => $newStatus];

			$this->dibiConnection->update('users', $data)
				->where('id IN (?)', $ids)
				->execute();
		}

		if ($this->isAjax()) {
			$this->redrawControl('flashes');
			$this['grid']->redrawControl();
		} else {
			$this->redirect('this');
		}
	}

	/**
	 * @param mixed[] $ids
	 */
	public function groupAddNote(array $ids, string $value): void
	{
		$this->flashMessage(
			sprintf('Note [%s] was added to items with ID: [%s]', $value, implode(',', $ids)),
			'success'
		);

		if ($this->isAjax()) {
			$this->redrawControl('flashes');
			$this['grid']->redrawControl();
		} else {
			$this->redirect('this');
		}
	}

	/**
	 * @param mixed[] $ids
	 */
	public function groupSend(array $ids, string $key): void
	{
		$this->flashMessage(
			sprintf('These items: [%s] sent to: [%s]', implode(',', $ids), $key),
			'success'
		);

		if ($this->isAjax()) {
			$this->redrawControl('flashes');
			$this['grid']->redrawControl();
		} else {
			$this->redirect('this');
		}
	}

	/**
	 * @param mixed[] $ids
	 */
	public function groupDelete(array $ids): void
	{
		$this->flashMessage(
			sprintf('These items: [%s] are being deleted', implode(',', $ids)),
			'info'
		);

		if ($this->isAjax()) {
			$this->redrawControl('flashes');
			$this['grid']->redrawControl();
		} else {
			$this->redirect('this');
		}
	}

	/**
	 * @param mixed[] $ids
	 */
	public function sayHello(array $ids): void
	{
		$this->flashMessage(
			sprintf('Hello said to: [%s]', implode(',', $ids)),
			'info'
		);

		if ($this->isAjax()) {
			$this->redrawControl('flashes');
			$this['grid']->redrawControl();
		} else {
			$this->redirect('this');
		}
	}

	/**
	 * @param mixed[] $ids
	 */
	public function groupMoveToGroup(array $ids, string $group): void
	{
		$this->flashMessage(
			sprintf('Items [%s] moved to group: [%s]', implode(',', $ids), $group),
			'success'
		);

		if ($this->isAjax()) {
			$this->redrawControl('flashes');
			$this['grid']->redrawControl();
		} else {
			$this->redirect('this');
		}
	}

	/**
	 * @param mixed[] $ids
	 */
	public function groupAssignTags(array $ids, string $tags): void
	{
		$this->flashMessage(
			sprintf('Tags [%s] assigned to items: [%s]', $tags, implode(',', $ids)),
			'success'
		);

		if ($this->isAjax()) {
			$this->redrawControl('flashes');
			$this['grid']->redrawControl();
		} else {
			$this->redirect('this');
		}
	}

	/**
	 * @param mixed[] $ids
	 */
	public function groupAddComment(array $ids, string $comment): void
	{
		$this->flashMessage(
			sprintf('Comment [%s] added to items: [%s]', $comment, implode(',', $ids)),
			'success'
		);

		if ($this->isAjax()) {
			$this->redrawControl('flashes');
			$this['grid']->redrawControl();
		} else {
			$this->redirect('this');
		}
	}

}
