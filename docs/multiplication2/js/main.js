window.addEventListener('DOMContentLoaded',function(e){
	let calculator = document.querySelector('.calculator'),
		UI;
	for(let i =1; i<9;i++){
			UIWraper = document.createElement('div');
			UI = document.createElement('div');
			UI.className = 'calculator__box';
			numberTitle = document.createElement('div');
			numberTitle.className = 'calculator__box__numberTitle';
			numberTitle.textContent = i+1;
			UIWraper.appendChild(numberTitle);
		for(let r=1; r<10; r++){
				numberRow = document.createElement('div');
				numberRow.className = 'calculator__box__numberRow';
				numberRow.textContent = i+1 + ' x ' + r + ' = ' + (i+1)*r ;
				UIWraper.appendChild(numberRow);
		}
		UI.appendChild(UIWraper);
		calculator.appendChild(UI);
	}

})