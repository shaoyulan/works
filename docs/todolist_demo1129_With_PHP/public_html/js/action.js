$(document).ready(function() {
	// todo list item structure
	var sources = $('#todo-list-item-template').html();
	// compile sources to make a ready-to-use holder
	var todoTemplate = Handlebars.compile(sources);

	//use jQuery each 
	var todoListUI='';
	$.each(todos,function(index,todo){
		todoListUI = todoListUI + todoTemplate(todo);
	});

	// show all list from DB
	$('#todo-list').find('li.new').before(todoListUI);

	//enter editor mode
	$('#todo-list')
		.on('dblclick','.content',function(e){
			$(this).prop('contenteditable','true').focus();
		})
		//update and create
		.on('blur','.content',function(e){
			//判斷是否是class=new
			var isNew = $(this).closest('li').is('.new')
			if (isNew){
				//create
				$('li.new .content').blur(function(e){
					var todo = $(this).text();
					todo = todo.trim();
					console.log(todo);

					// 使用者有輸入資料才新增li
					if (todo.length>0){
							var order = $('#todo-list').find('li:not(.new)').length + 1; //

							//AJAX: create API
							$.post('todo/create.php', {content: todo,order:order}, function(data, textStatus, xhr) {
								console.log(todo);
								todo ={   //var todo cause error
								id:data.id,
								is_complete:false,
								content:todo,
								};
								console.log(todo);
								var li = todoTemplate(todo);
								$(e.currentTarget).closest('li').before(li);
								console.log('ok')
								},'json');
							}
							$(e.currentTarget).empty()
							// clear new todo item
				});
			}else{
				var id=$(this).closest('li').data('id'); //.data
				var content=$(this).text(); //.text
				$.post('todo/update.php', {id: id,content:content});
				$(e.currentTarget).prop('contenteditable','false')
			}
			
		})

		//delete
		.on('click','.delete',function(e){
			var result = confirm('do you want to delete');
			if (result){
				// AJAX call
				var id=$(this).closest('li').data('id');
				$.post('../todo/delete.php', {id: id}, function(data, textStatus, xhr) {
					/*optional stuff to do after success */
					$(e.currentTarget).closest('li').remove(); //*****重要 e.currentTarget
				});
			}
		})

		//complete
		.on('click','.checkbox',function(e){
			//AJAX call
			var id =$(this).closest('li').data('id');
			$.post('todo/complete.php', {id: id}, function(data, textStatus, xhr) {
				$(e.currentTarget).closest('li').toggleClass('complete');
			});
		});

		// sortable feature
		$('#todo-list').find('ul').sortable({
			items:'li:not(.new)',
			stop:function(){
				var orderPair =[];
				$('#todo-list').find('li:not(.new)').each(function(index,li){
					orderPair.push({  // .push
						id:$(li).data('id'),
						order : index + 1,
					});
				});

				$.post('todo/sort.php', {orderPair: orderPair});
			},
		});
});