document.addEventListener('change', function (e) {
	var buttons, checked_inputs, counter, event, grid, i, ie, input, inputs, len, results, select, total;
	grid = e.target.getAttribute('data-check');
	if (grid) {
		checked_inputs = document.querySelectorAll('input[data-check-all-' + grid + ']:checked');
		select = document.querySelector('.datagrid-' + grid + ' select[name="group_action[group_action]"]');
		buttons = document.querySelectorAll('.datagrid-' + grid + ' .row-group-actions *[type="submit"]');
		counter = document.querySelector('.datagrid-' + grid + ' .datagrid-selected-rows-count');

		if (checked_inputs.length) {
			if (buttons) {
				buttons.forEach(function (button) {
					button.disabled = false;
				});
			}
			if (select) {
				select.disabled = false;
			}
			total = document.querySelectorAll('input[data-check-all-' + grid + ']').length;
			if (counter) {
				counter.innerHTML = checked_inputs.length + '/' + total;
			}
		} else {
			if (buttons) {
				buttons.forEach(function (button) {
					button.disabled = true;
				});
			}
			if (select) {
				select.disabled = true;
				select.value = "";
			}
			if (counter) {
				counter.innerHTML = "";
			}
		}
		ie = window.navigator.userAgent.indexOf("MSIE ");
		if (ie) {
			event = document.createEvent('Event');
			event.initEvent('change', true, true);
		} else {
			event = new Event('change', {
				'bubbles': true
			});
		}
		if (select) {
			select.dispatchEvent(event);
		}
	}
	grid = e.target.getAttribute('data-check-all');
	if (grid) {
		inputs = document.querySelectorAll('input[type=checkbox][data-check-all-' + grid + ']');
		results = [];
		for (i = 0, len = inputs.length; i < len; i++) {
			input = inputs[i];
			input.checked = e.target.checked;
			ie = window.navigator.userAgent.indexOf("MSIE ");
			if (ie) {
				event = document.createEvent('Event');
				event.initEvent('change', true, true);
			} else {
				event = new Event('change', {
					'bubbles': true
				});
			}
			results.push(input.dispatchEvent(event));
		}
		return results;
	}
});
