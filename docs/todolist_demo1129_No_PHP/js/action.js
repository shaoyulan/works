$(document).ready(function() {
	// todo list item structure
	var sources = $('#todo-list-item-template').html();
	// compile sources to make a ready-to-use holder
	var todoTemplate = Handlebars.compile(sources);

	//enter editor mode
	$('#todo-list')
		.on('dblclick','.content',function(e){
			// 雙擊之後改成editable 並 focus
			$(this).prop('contenteditable','true').focus();
			///////////////////////////////////////////////
		})
		//update and create
		.on('blur','.content',function(e){
			//判斷是否是class=new //////////////////////////
			var isNew = $(this).closest('li').is('.new')
			////////////////////////////////////////////////
			if (isNew){
				//create
				$('li.new .content').blur(function(e){
					var todo = $(this).text();
					todo = todo.trim();

					// 使用者有輸入資料才新增li
					if (todo.length>0){
						// 物件格式存放資料，準備放入template
						var todo ={
							is_complete:false,
							content:todo,
						};
						////////////////////////////////////
						var li = todoTemplate(todo);
						$(this).closest('li').before(li);

					}
					$(this).empty()
					// clear new todo item
				});
			}else{
				$(this).prop('contenteditable','false')
			}
			
		})

		//delete
		.on('click','.delete',function(e){
			var result = confirm('do you want to delete');
			if (result){
				$(this).closest('li').remove();
			}
		})

		.on('click','.checkbox',function(e){
			$(this).closest('li').toggleClass('complete');
		});

		// 使用Jquery UI 的sortable
		$('#todo-list').find('ul').sortable({
			items:'li:not(.new)',
		});
		///////////////////////////////////////
});