$(function(e){

	// Scroll and show
	$('.block').smoove();

	// Animated Modal
	$("#demo01").animatedModal({
		color:'#f8f8f8'
	});

	// Click Link on Nav
	$('header .nav-link,header .dropdown-item').on('click',function(e){
		// e.preventDefault();

		let target = $(this).data('target'),
			targetPos =0;

		if(!target){
			return;
		}

		console.log(target);
		if(target == 'javascript' || target =='htmlcss' || target =='php'){
			console.log(target);
			targetPos = $('.works-section').offset().top;
		}else{
			targetPos = $(target).offset().top;
		}

		
			$('html').animate({
				scrollTop:targetPos+40,
			},1500);
		

		if(target == 'htmlcss'){
			$('.works-section .nav-link:eq(1)').click();
		}else if(target == 'php'){
			$('.works-section .nav-link:eq(2)').click();
		}

		
	});
});