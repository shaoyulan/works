jQuery(document).ready(function($) {
//default set up

	//建立模板產生、放置器 fill template function
	var place_data = function($structure,$target,$data){
		var html_structure = $($structure).html();
		var compiled_template = Handlebars.compile(html_structure);
		var UI = '';
		$.each($data,function(index,data){
			UI = UI + compiled_template(data);
		});
		$($target).html(UI);
		UI = '';
	};

	// 建立可塞選的模板產生器，用於點擊不同分類時 篩選基準category_main、sub
	var Call_AJAX_place_data = function($clicked_target,$info_to_send,$where_to_place){
		
		//判斷裡面是否為空，為空則抓取資料
		if ($($where_to_place).find('.col-md-3').length == 0){
			// 轉換為json object
			// var before_parse = '{"category_main":'+$info_to_send+'}'; 
			//直接將 $info_to_send的值帶入 {"category_main":$info_to_send} 將無法運作 
			$.post('../crud/data_filtered.php', jQuery.parseJSON($info_to_send), function(data, textStatus, xhr) {
					place_data('#product-list-template',$where_to_place,data);
			});
		}

	}

	// 載入個頁面 Load specified page on click
	var Page_loader = function(e,$page_to_load){
		e.preventDefault();
		$('.wraper>div').css('display','none');
		$('.wraper>div:not(".index")').css('display','block').load("product/product_paging.php");
	}

	// 各頁點擊載入 -- WOMEN -- Upper
	$('a[href="product/product_paging.html"]').bind('click',{key1:this,key2:"product/product_paging.php"},Page_loader);
	
	
	// 首頁點擊載入(首頁不使用Page_loader) -- Home 
	$('a[href="index.php"]').click(function(e){
		e.preventDefault();
		$('.wraper>div').css('display','none');
		$('.wraper').find('.index').css('display','block');

	}); 

	// 放置Bbanner廣告 place Banner carousel
	place_data('#header-slider-template','.carousel-inner',headerAds);
	// 放置不分類商品place Content products -- Category ALL
	place_data('#product-list-template','#service-one .row',products);
	// 點擊分類後顯示商品 place content products -- Category Women
	$('a[href="#service-two"]').on('click',Call_AJAX_place_data(this,'{"category_main":"women"}','#service-two .row'));
	$('a[href="#service-three"]').on('click',Call_AJAX_place_data(this,'{"category_main":"men"}','#service-three .row'));
	$('a[href="#service-four"]').on('click',Call_AJAX_place_data(this,'{"category_main":"kid"}','#service-four .row'));


	// Cart number counter
	$('.wraper').on('click','.btn',function(e){
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
				// 登入成功後收起選單
				$('.login-form').slideToggle(400);
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