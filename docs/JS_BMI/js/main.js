$(function(e){
	let bmiArray = JSON.parse(sessionStorage.getItem('bmi')) || [],
		temp = $('.record').clone(), // template for records
		bmi=0, // bmi index
		lists = $('.lists'); // 下方BMI主要區塊

	function getBmiLevel(bmi){
		let bmiLevel ='';
		switch(true){
			case (bmi<=18.5):
			bmiLevel = 'light-weight';
			break;

			case (bmi<=25):
			bmiLevel = '';
			break;

			case (bmi<=30):
			bmiLevel = 'over-weight';
			break;

			case (bmi<=35):
			bmiLevel = 'slight-fat';
			break;

			case (bmi<=40):
			bmiLevel = 'medium-fat';
			break;

			case (bmi>40):
			bmiLevel = 'over-fat';
			break;
		}
		return bmiLevel;
	}

	// 儲存結果
	function Insert(bmiArray){
		sessionStorage.setItem('bmi',JSON.stringify(bmiArray));
	}

	function Update(bmiArray,e){
		$('.record').remove(); // 清空畫面

		$.each(bmiArray,function(index,obj){
			let newRecord = temp.clone(),
				bmiLevel = getBmiLevel(obj.bmi);
			newRecord.attr('data-status',bmiLevel)
					 .attr('data-num',index)
			         .find('.index').text((obj.bmi).toFixed(2))
			         .end()
			         .find('.weight').text(obj.weight+'kg')
			         .end()
			         .find('.height').text(obj.height+'cm')
			         .end()
			         .find('.date').text(obj.date);
			lists.append(newRecord);
		});

		// 是否是使者按下計算
		if(e){
			// input-btn的狀態永遠是bmiArray最後一個的
			$('.input-btn').attr('data-status',getBmiLevel(bmiArray[bmiArray.length-1].bmi));
		}
	}

	// Delete 
	function del(num){
		bmiArray.splice(num,1);
		Insert(bmiArray);
		Update(bmiArray);
	}
	
	// Generate Date
	function today(){
		let date = new Date(),
			today = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
		return today;
	}


	// When press the see result btn
	$('.circle').on('click',function(e){
		let height = $('.input-height').val().trim(),
			weight = $('.input-weight').val().trim(),
			bmi = weight/(Math.pow(height/100,2));
		if(!height || !weight){
			alert('請輸入身高體重');
			return false;
		}
		bmiArray.push({
			height:height,
			weight:weight,
			bmi:bmi,
			date:today()
		});
		Update(bmiArray,e); 
		Insert(bmiArray); 

		// 清空
		$('.input-height, .input-weight').val('');

	});

	// delete
	$('body').on('click','.delete',function(e){
		let num = $(this).closest('.record').data('num');
		del(num);
	});

	$(window).on('keydown',function(e){
		if(e.keyCode == '13'){
			$('.circle').click();
		}
	});

	Update(bmiArray);
});