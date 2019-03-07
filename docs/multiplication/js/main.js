window.addEventListener('DOMContentLoaded',function(e){
	let calculator = document.querySelector('.calculator'),
		UI;
	for(let i =1; i<9;i++){
			UI = document.createElement('div');
			UI.className = 'calculator__box';
			calculator__box__left = document.createElement('div');
			calculator__box__left.className = 'calculator__box__left';
			calculator__box__right = document.createElement('div');
			calculator__box__right.className = 'calculator__box__right';
		for(let r=1; r<10; r++){
				if(r==1){
						numberTitle = document.createElement('div');
						numberTitle.className = 'calculator__box__numberTitle';
						numberTitle.textContent = i+1;
						calculator__box__left.appendChild(numberTitle);
				}
				
				numberRow = document.createElement('div');
				numberRow.className = 'calculator__box__numberRow';
				numberRow.textContent = i+1 + ' x ' + r + ' = ' + (i+1)*r ;
				if(r<=3){
					calculator__box__left.appendChild(numberRow);
				}else{
					calculator__box__right.appendChild(numberRow);
				}
				UI.appendChild(calculator__box__left);
				UI.appendChild(calculator__box__right);
		}
		calculator.appendChild(UI);
	}

})