var finishFlash = function() {
	if ($('.flash').length > 0) {
		setTimeout(
	  		function() {
	  			$('.flash').remove();
	  		},
	  		4000
	  	);
	}
};

if (typeof naja !== "undefined") {
	class FlashesExtension {
		initialize(naja) {
			naja.addEventListener('complete', finishFlash);
		}
	}

	naja.registerExtension(new FlashesExtension);

} else {
	$.nette.ext('flashes', {
	  complete: function() {
	  	finishFlash();
	  }
	});
}

finishFlash();
