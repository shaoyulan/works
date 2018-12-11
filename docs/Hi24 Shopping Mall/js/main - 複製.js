jQuery(document).ready(function($) {
//default set up
	//target template
	var source_product_list = $('#product-list-template').html();
	var source_header_ad = $('#header-slider-template').html();
	// compile template 
	var productListTemplate = Handlebars.compile(source_product_list);
	var hederAdTemplate = Handlebars.compile(source_header_ad);

	// Header_Ad empty html holder
	var headerAdUI = '';
	$.each(headerAds,function(index,headerAd){
		headerAdUI = headerAdUI + hederAdTemplate(headerAd);
	});
	// add compiled html to website
	$('.carousel-inner').prepend(headerAdUI);

	// Prodcut_list empty html holder
	var productListUI = '';
	$.each(products,function(index,product){
		productListUI = productListUI + productListTemplate(product);
	});
	// add compiled html to website
	$('#myTabContent .row').prepend(productListUI);


	// Cart number counter
	$('#myTabContent').find('.btn').click(function(e){
		e.preventDefault();
		// selected-item price
		var price = $(this).parent().prev().prev().find('.p_prices').text();

		// fetch current number
		var number = $('.navbar-right').find('.glyphicon').text();
		// renew total number
		$('.navbar-right').find('.glyphicon').text(++number);
	});

	// login form -- show form
	$('.login').click(function(e){
		e.preventDefault();
		// close shopping cart if exists
		// see if shopping cart is on display
		var shopping_cart_stat = $(this).closest('.navbar-right').find('.cart-total').css('display');
		if(shopping_cart_stat == 'block'){
			$(this).closest('.navbar-right').find('.cart-total').stop().slideToggle(400);
		}
		// after close shopping cart, show/hide login form
		$(this).closest('.navbar-right').find('.login-form').stop().slideToggle(400);
	});

	// login verify
	$('.login-form').find('.submit').click(function(e){
		var username = $('.username').text().trim();
		var password = $('.password').text().trim();
		$.post('../crud/meber_verify.php', {username: username,password:password}, function(data, textStatus, xhr) {
			// var ans = jQuery.parseJSON(data);  ps. If the returned data is plain text, use this to transfer it to jason objet
			if (data.verify == '錯誤的帳號或密碼'){
				$('.login').html('<span style="color:red">'+data.verify+'!</span>');
			}else{
				$('.login').text('親愛的'+data.verify+'您好!');
			}
		});
	});

	// show shopping detail
	$('.navbar-right').find('.right').first().click(function(e){
		e.preventDefault();
		// see if login form is on display
		var login_from_stat = $(this).closest('.navbar-right').find('.login-form').css('display');
		if(login_from_stat == 'block'){
			$(this).closest('.navbar-right').find('.login-form').stop().slideToggle(400);
		}

		// after close login fomr, show/hide login form
		var total = $('.navbar-right').find('.glyphicon').text();
		var text = '目前有'+total+'樣商品，共';
		$(this).closest('.navbar-right').find('.cart-total').text(text).stop().slideToggle(400);
	});
//paging


});