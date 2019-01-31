
(function($){
	$.fn.rotateMe = function($visibility){
		var visibility = $visibility, // trigger when 1/$visibility of img have shown up
			target = this, // img array
			topMargin = target[0].getBoundingClientRect().top, // 第一張圖到top距離(After rotate)
			// Vars for first img
			height = target[0].clientHeight, // height of first img
			innerHeight = window.innerHeight, // height of inner window
			trigger = innerHeight, 
			gap_cause_by_rotate = (height/2), // 翻轉90度造成的高度誤差，使topMargin出現誤差
			triggerLine = (height/visibility)+(topMargin-gap_cause_by_rotate); // 設定視窗底部超過 照片 1/3時 就觸發

		// When visit website, the first img may have to trigger without any scroll
		// 假設進入畫面時看到的圖片部分已經超過1/3
		console.log('FTM',topMargin);
		if(trigger > triggerLine){
			target[0].classList.add('flipped');
		}

		window.addEventListener('scroll',function(e){
			var top = $(window).scrollTop(), // how many height have been scrolled
				innerHeight = window.innerHeight, // height of current widow
				trigger = top + innerHeight, 
				triggerLine = (height/visibility) + topMargin; // when the bottom reach 1/3 of the img, trigger!

			// setting for other imgs
			for(var i =0; i< target.length;i++){
				var triggerLine = (height/visibility) + (topMargin-gap_cause_by_rotate) + height*i;

					if (trigger > triggerLine && trigger < triggerLine+200){
						target[i].classList.add('flipped');
					}
			}

		});

		return this;
	}
})(jQuery)

