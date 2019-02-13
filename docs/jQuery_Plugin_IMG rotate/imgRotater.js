
(function($){
	$.fn.rotateMe = function($visibility){
		// Static varialbes
		const visibility = $visibility,         // Trigger when 1/$visibility of img have shown up
			  target = this,                    // Img array
			  height = target[0].clientHeight,  // Height of first img
			  trigger = window.innerHeight,     // Height of inner window
			  gap_cause_by_rotate = (height/2), // 翻轉90度造成的高度誤差，使topMargin出現誤差
			  sense_range = 300;                // A range where Event will be trigger 

		// When visit website, Effect may have to be triggered without any scroll
		for(let i =0; i< target.length;i++){
			const topMargin = target[i].getBoundingClientRect().top,
				  triggerLine = (height/visibility) + (topMargin-gap_cause_by_rotate); // 設定視窗底部超過 照片 1/3時 就觸發
			if(trigger > (triggerLine)){
				target[i].classList.add('flipped');
			}
		}

		// Otherwise, we trigger effect when scroll down to position.
		window.addEventListener('scroll',function(e){
			// Dynamic variables when scroll
			const top = $(window).scrollTop(),      // How many height have been scrolled
				  innerHeight = window.innerHeight, // Height of current widow
				  trigger = top + innerHeight;      // The ghost will catch prey(triggerLine)

			// Settings here
			for(let i =0; i< target.length;i++){
				const topMargin = target[i].getBoundingClientRect().top,
					  triggerLine = (height/visibility) + (topMargin-gap_cause_by_rotate) + window.scrollY;
					  // console.log('TL',navigator.clipboard.writeText('ok'));
					if (trigger > triggerLine && trigger < triggerLine+sense_range){
						target[i].classList.add('flipped');
					}
			}

		});

		return this;
	}
})(jQuery)
