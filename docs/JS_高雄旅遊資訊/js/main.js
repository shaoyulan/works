window.addEventListener('DOMContentLoaded',function(e){

	xhr = new XMLHttpRequest();
	xhr.open('GET','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',true)
	xhr.send(null);
	xhr.onload = function(){
		let response = JSON.parse(xhr.responseText), // 轉換資料型態
		    result = response.result.records, // 資料位置
		    selectBar = document.querySelector('#area'), // 行政區下拉選單
		    areaTitle = document.querySelector('.attractions-list').firstChild.nextSibling.firstChild, // 標題
		    temp = document.querySelector('#temp').firstChild.nextSibling, // 景點樣板
		    content = document.querySelector('.attractions-boxs'), // 主要區塊
		    holder = document.createElement('li'),
		    areaAry =[], // 儲存已巡迴過的區域
		    resultObj ={}, // 地區資料 key:第區, value:[{景點1},{景點2}...];
		    listPerPage = sessionStorage.getItem('ks-setting') || 6, // 每頁顯示筆數
		    listInPaging = 3, // 分頁清單要顯示的筆數
		    pagList = document.querySelector('.pagination'), //分頁清單DOM
		    currPage = 0, // 目前所在頁數
		    currArea =''; //目前所在區域
	
		// custom selector
		function getFromTemp(target){
			return template.querySelector(target);
		}

		
		// 設定
		function setting(num){
			// 儲存設定
			sessionStorage.setItem('ks-setting',num);
			listPerPage = num;
		}
		// 列印分頁清單
		function pagination(area,pageNum){
			
			let prev = document.getElementsByClassName('prev'), // 前一頁按鈕
				next = document.getElementsByClassName('next'), // 下一頁按鈕
				pageCount = Math.ceil(resultObj[area].length/listPerPage), // 有幾頁
				numberLink =document.querySelectorAll('.numberLink'); // 第幾頁按鈕
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
				// ES6 Template Literals ***NOT SUPPORTED*** in IE
				list.innerHTML = '<a class="page-link" href="#">'+index+'</a>';
				list.className = 'page-item numberLink';
				// 將目標頁面設為active
				if(index == pageNum){
					list.className += ' active';
				}
				// 綁定更新頁面事件
				list.addEventListener('click',function(e){
					update(currArea,Number(e.target.text))
				})
				pagList.insertBefore(list,pagList.lastChild.previousSibling);
			}
			// 隱藏下一頁
			if(pageNum == pageCount){
				next[0].className = 'next d-none';
			}
			// 隱藏上一頁
			if(pageNum ==1 ){
				prev[0].className = 'prev d-none';
			}
			// 更新目前頁數
			currPage = pageNum;
		}

		// 轉場效果
		function viewChange(target,step,callback) {
			if(target == 0 && !content.style.opacity )
				content.style.opacity = '1';
		    function animateScroll(timeStamp){    
		    	// timeStamp : 由JS自動傳入
		        content.style.opacity = Number(content.style.opacity)+step;
		        if((Number(content.style.opacity) > target && step<0) || (Number(content.style.opacity) < target && step >0) ) {
		            window.requestAnimationFrame(animateScroll);
		        }else{
		        	window.cancelAnimationFrame(animateScroll);
		        	// check before callback
		        	if(typeof(callback) !== 'undefined'){
		        		callback();
		        	}
		        }
		    };
		    animateScroll();
		    if(step < 0){
		    	content.innerHTML ='';
		    }
		} 

		// 列印資料畫面
		function update(newArea,pageNum){

			let titlePosition = $('.attractions-list h2').offset().top, // 標題位置
				from = (pageNum-1)*listPerPage, // 開始頁數
				to = (pageNum*listPerPage)-1, // 結束頁數
				resultCount = resultObj[newArea].length-1, // 資料筆數
				newTo = resultCount < to ? resultCount:to; // 當資料筆數較少

			// 轉場效果
			viewChange(0,-0.025,function(){
				viewChange(1,0.05);
				// 捲動至資料位置
				$('html,body').animate({
					scrollTop:titlePosition,
				},1500);
			});
			// 更新標題
			areaTitle.nodeValue = newArea;
			// 0-5:第一頁; 6-11:第二頁
			for (let i = from; i<= newTo; i++) {
				// a++;
				let attract = resultObj[newArea][i];
				// 設定景點資料
					// 複製樣板
					template = temp.cloneNode(true); 
					// 取得要寫入的位置
					let open = getFromTemp('.opening-time').firstChild.nextSibling.nextSibling, 
						location = getFromTemp('.addr').firstChild.nextSibling.nextSibling,
						tel = getFromTemp('.tel').firstChild.nextSibling.nextSibling,
						freeVisit = getFromTemp('.free-visit').firstChild.nextSibling.nextSibling,
						attraction = getFromTemp('.attraction').firstChild,
						area = getFromTemp('.location').firstChild,
						img = getFromTemp('.img-holder');
					open.nodeValue = attract.Opentime; //開放時段
					location.nodeValue = attract.Add; // 地址
					tel.nodeValue = attract.Tel;  // 電話
					img.style.background = 'url('+attract.Picture1+')'; // 照片
					img.style.backgroundPosition  = 'center center'; 
					img.style.backgroundSize  = 'cover';
					attraction.nodeValue = attract.Name; // 名稱
					area.nodeValue = attract.Zone; // 所在行政區
					freeVisit.nodeValue = attract.Ticketinfo; // 門票資訊
					if(!attract.Ticketinfo){freeVisit.parentNode.style.display = 'none'} //無門票資訊時
					// 將景點新增至頁面
					content.appendChild(template);
			}
			// 更新清單
			pagination(newArea,pageNum);
			
		}

		// 轉換資料為obj
		for (index in result){
			// Obj沒有該地區時新增

			if(!resultObj.hasOwnProperty(result[index].Zone)){
				resultObj[result[index].Zone]=[];
			}
			// 資料新增入該地區
			resultObj[result[index].Zone].push(result[index]);
		}
		console.log(resultObj);

		// 列印下拉選單
		for (index in resultObj) {
			let num=1;
			// 檢查是否有相同名稱
			// areaAry.includes is NEW in ES2016 and **NOT SUPPORTED** in IE
			let opt = document.createElement('option');
			opt.text = index;
			opt.value = index;
			if(num == 1){
				opt.id ='first';
				currArea = index; //第一個為預設區域	
				num++
			}
			selectBar.appendChild(opt);
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

		// 回頂端
		$('.gotop').on('click',function(e){
			$('html,body').animate({
				scrollTop:0,
			},1500);
		})

		// 變更設定
		$('.setting').on('click',function(e){
			setting(e.target.dataset.num); // 更新設定
			$('.setting-save').on('click',function(e){
				update(currArea,1);  // 更新頁面
			})
		})
		
		// 取消所有default 
		$(window).on('click',function(e){
			e.preventDefault();
		});



		
	}


});
