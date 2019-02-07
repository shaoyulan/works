window.addEventListener('DOMContentLoaded',function(e){
	xhr.onload = function(){
		let response = JSON.parse(xhr.responseText),
			result = response.result.records,
			selectBar = document.querySelector('#area'),
			areaTitle = document.querySelector('.attractions-list').firstChild.nextSibling.firstChild,
			template = 
			'<li >'+
					'<div class="box">'+
						'<div class="img">'+
							'<div class="img-holder">'+
								'<div class="attraction">高雄願景館</div>'+
								'<div class="location">三民區</div>'+
							'</div>'+
						'</div>'+
						'<ul class="info">'+
							'<li class="opening-time">'+
								'<img src="img/icons_clock.png" alt="">'+
								'周二至周日10:00-18:00，每周一公休'+
							'</li>'+
							'<li class="addr">'+
								'<img src="img/icons_pin.png" alt="">'+
								'高雄市三民區建國二路318號'+
							'</li>'+
							'<li class="tel">'+
								'<img src="img/icons_phone.png" alt="">'+
								'886-7-2363357'+
								'<span class="free-visit">'+
									'<img src="img/icons_tag.png" alt="">'+
									'免費參觀'+
								'</span>'+
							'</li>'+
						'</ul>'+
					'</div>'+
				'</li>',
				temp = document.querySelector('#temp').firstChild.nextSibling,
				boxMother = document.querySelector('.attractions-boxs'),
				holder = document.createElement('li'),
				areaAry =[];


		for (index in result) {
			// 檢查是否有相同名稱
			if(!areaAry.includes(result[index].Zone)){
				areaAry.push(result[index].Zone);

				let attract = result[index],
					opt = document.createElement('option');
				opt.text = attract.Zone;
				opt.value = attract.Zone;
				if(areaAry.length == 1){
					opt.id ='first';	
				}
				selectBar.appendChild(opt);
			}
		}

		$(selectBar).on('change',function(e){
			
			// 清空
			boxMother.innerHTML ='';
			// 更新標題
			let newArea = e.target.value,
				titlePosition = $('.attractions-list h2').offset().top;
				console.log(titlePosition);
			areaTitle.nodeValue = newArea;

			let a = 0,
				inner ='';
			for (index in result) {
				a++;
				let attract = result[index];
				// console.log(result[index].Name);
				if(attract.Zone == newArea){
					template = temp.cloneNode(true);
					let open = template.querySelector('.opening-time').firstChild.nextSibling.nextSibling,
						location = template.querySelector('.addr').firstChild.nextSibling.nextSibling,
						tel = template.querySelector('.tel').firstChild.nextSibling.nextSibling,
						freeVisit = template.querySelector('.free-visit').firstChild.nextSibling.nextSibling,
						attraction = template.querySelector('.attraction').firstChild,
						area = template.querySelector('.location').firstChild,
						img = template.querySelector('.img-holder');
					open.nodeValue = attract.Opentime;
					location.nodeValue = attract.Add;
					tel.nodeValue = attract.Tel;
					img.style.background = 'url('+attract.Picture1+')';
					img.style.backgroundPosition  = 'center center';
					img.style.backgroundSize  = 'cover';
					freeVisit.nodeValue = attract.Ticketinfo;
					attraction.nodeValue = attract.Name;
					area.nodeValue = attract.Zone;

					boxMother.appendChild(template);
				}
			}
			
			$('html').animate({
				scrollTop:titlePosition,
			},1500);
		});
		

		// 熱門區域綁定事件
		$('.area').on('click','li',function(e){
			let target = e.target.textContent;
			$(selectBar).val(target).trigger('change');
		});
		
		// 預設三民區
		$(selectBar).val('三民區').trigger('change');


	}
	
});
