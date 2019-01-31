
(function($){
	$.fn.rotateMe = function($visibility){
		// 基本設定，手動調整
		var visibility = $visibility, // 當照片露出超過1/3時觸發

			// 內部設定
			target = this, // img array
			TopMargin = target[0].getBoundingClientRect(), // 第一張圖到top距離
			// Vars for first img
			height = target[0].clientHeight, // height of first img
			innerHeight = window.innerHeight, // 可視畫面高度
			trigger = innerHeight, 
			triggerLine = (height/visibility); // 設定視窗底部超過 照片 1/3時 就觸發

		// When visit website, the first img may have to trigger without any scroll
		// 假設進入畫面時看到的圖片部分已經超過1/3
		if(trigger > triggerLine){
			target[0].classList.add('flipped');
		}


		window.addEventListener('scroll',function(e){

			var top = $(window).scrollTop(), // how many height have been scrolled
				innerHeight = window.innerHeight, // height of current widow
				trigger = top + innerHeight, 
				triggerLine = (height/visibility) + TopMargin.top; // when the bottom reach 1/3 of the img, trigger!

			// setting for other imgs
			for(var i =0; i< target.length;i++){
				var triggerLine = (height/visibility) + TopMargin.top + height*i;
					if (trigger > triggerLine && trigger < triggerLine+200){
						target[i].classList.add('flipped');
					}
			}

		});

		return this;
	}
})(jQuery)

