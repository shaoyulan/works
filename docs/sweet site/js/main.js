$(document).ready(()=>{
	// Header onscrolldown
	$(document).on('scroll',function(e){
		let scrollTop = $(window).scrollTop(),
			isOnScroll = $('header.header--scroll').length;
		if (scrollTop > 50 && isOnScroll == 0){
			$('header').addClass('header--scroll');
		}
		if (scrollTop < 50 && isOnScroll == 1){
			$('header').removeClass('header--scroll');
		}
	})
	// Mobile Hamberger onclick
	$('.l-header__brandLogo--hamberger').click((e)=>{
		$('.l-header__menu').toggleClass('l-header__menu--mobileShow');
	});

	// Mobile Menue onclick
	$('.l-header__menu__item').click((e)=>{
		// e.preventDefault();
		$('.l-header__menu__item').removeClass('l-header__menu--active');
		$(e.currentTarget).toggleClass('l-header__menu--active');
	});

	// Checkout 3-1/3-2 Envoice
	let panel ={
		el:'.form-card',
		selected:null,
		selectBtn:'.envoice-choice div',
		eEnvoice:'.eEnvoice__group',
		pEnvoice:'.pEnvoice__group',
		removeClass:()=>{
			console.log('ok');
			// $(panel.eEnvoice).add(panel.pEnvoice).addClass('fade').removeClass('faded');
			$(panel.eEnvoice).add(panel.pEnvoice).animate({'opacity':0,'z-index':-1},0);
			$(panel.selectBtn).removeClass('selected');
			
		},
		
		switchToEenvoice:()=>{
			panel.removeClass();
			// $(panel.eEnvoice).addClass('faded')
			// 須讓元素排到上層，否則動畫階段看不到
			$(panel.eEnvoice).css({'z-index':1}).animate({'opacity':1},500);
		},
		switchToPenvoice:()=>{
			panel.removeClass();
			// $(panel.pEnvoice).addClass('faded')
			// 須讓元素排到上層，否則動畫階段看不到
			$(panel.pEnvoice).css({'z-index':1}).animate({'opacity':1},500);
		},
		action:function(e){
			let target = e.target;
			// 處理內容區
			if ($(target).is('.pEnvoice')) {
				this.switchToPenvoice();
			}
			else if ($(target).is('.eEnvoice')){
				this.switchToEenvoice();
			}
			// 更新BTN 狀態
			$(e.target).addClass('selected');
		}
	}

	$(panel.el).on('click',(e)=>{
		panel.action(e);
	})

});