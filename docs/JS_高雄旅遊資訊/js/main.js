window.addEventListener('DOMContentLoaded',function(e){
	xhr.onload = function(){
		let response = JSON.parse(xhr.responseText), // 轉換資料型態
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
			areaAry =[], // 儲存已巡迴過的區域
			resultObj ={}, // 地區資料 key:第區; value:[{景點1},{景點2}...];
			listPerPage =6, // 每頁顯示筆數
			listInPaging = 3, // 分頁清單要顯示的筆數
			pagList = document.querySelector('.pagination'), //分頁清單DOM
			currPage = 0, // 目前所在頁數
			currArea =''; //目前所在區域

		// 轉換資料為obj
		for (index in result){
			// Obj 沒有該地區
			if(!resultObj.hasOwnProperty(result[index].Zone)){
				resultObj[result[index].Zone]=[];
			}
			// 資料新增入該地區
			resultObj[result[index].Zone].push(result[index]);
		}

		// 列印下拉選單
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

		// 列印分頁清單
		function pagination(area,pageNum){
			let prev = document.getElementsByClassName('prev'),
				next = document.getElementsByClassName('next'),
				pageCount = Math.ceil(resultObj[area].length/listPerPage),
				numberLink =document.querySelectorAll('.numberLink');

			// 上下頁按鈕預設狀態
			prev[0].className = 'page-item prev';
			next[0].className = 'next page-item';

			// 清空舊頁碼
			if(numberLink.length > 0){
				// 假如沒回傳空陣列
				// 巡迴清空數字分頁li
				for(let i = 0; i< numberLink.length; i++){
					numberLink[i].parentNode.removeChild(numberLink[i]);
				}
			}

			// 列印頁碼
			for(let index = 1; index <= pageCount; index++){
				let list = document.createElement('li');

				// Pending : 將 list直接轉DOM
				list.innerHTML = `<a class="page-link" href="#">${index}</a>`;
				list.className = 'page-item numberLink';
				// 將目標頁面設為active
				if(index == pageNum){
					list.className += ' active';
				}
				// 綁定更新頁面事件
				list.addEventListener('click',function(e){
					e.stopPropagation();
					update(currArea,Number(e.target.text))
					// pagination(currArea,Number(e.target.text))
				})
				pagList.insertBefore(list,pagList.lastChild.previousSibling);
			}
			// 上下頁鈕是否隱藏
			if(pageNum == pageCount){
				next[0].className = 'next d-none';
			}
			if(pageNum ==1 ){
				prev[0].className = 'prev d-none';
			}
			// 更新目前頁數
			currPage = pageNum;
		}

		// 列印資料畫面
		function update(newArea,pageNum){
			let a = 0,
				inner ='',
				titlePosition = $('.attractions-list h2').offset().top,
				from = (pageNum-1)*listPerPage, // 開始頁數
				to = (pageNum*listPerPage)-1, // 結束頁數
				resultCount = resultObj[newArea].length-1, // 資料筆數
				newTo = resultCount < to ? resultCount:to; // 新結束頁數

			// 清空
			boxMother.innerHTML ='';
			// 更新標題
			areaTitle.nodeValue = newArea;
			// 0-5:第一頁; 6-11:第二頁
			for (let i = from; i<= newTo; i++) {
				a++;
				let attract = resultObj[newArea][i];
				// 設定景點資料
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
					// 將景點新增至頁面
					boxMother.appendChild(template);
			}

			// 更新清單
			pagination(newArea,pageNum);

			// 捲動至資料位置
			$('html').animate({
				scrollTop:titlePosition,
			},1500);
			
			
		}

		// 綁定清單變動
		$(selectBar).on('change',function(e){
			// 定義變數
			let newArea = e.target.value;
			// 呼叫頁面更新
			update(newArea,1,e)
			// 更新目前區域
			currArea = newArea;
		});
		

		// 熱門區域綁定事件
		$('.area').on('click','li',function(e){
			let target = e.target.textContent;
			$(selectBar).val(target).trigger('change');
		});
		
		// 綁定上一頁 / 下一頁
		$('.prev').on('click',function(e){
			update(currArea,currPage-1);
		})
		$('.next').on('click',function(e){
			update(currArea,currPage+1);
		})



	}
	
});
