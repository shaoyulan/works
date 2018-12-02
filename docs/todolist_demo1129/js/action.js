$(document).ready(function() {
	// todo list item structure
	var sources = $('#todo-list-item-template').html();
	// compile sources to make a ready-to-use holder
	var todoTemplate = Handlebars.compile(sources);

	//create
	$('li.new .content').blur(function(e){
		var todo = $(this).text();
		todo = todo.trim();

		// 使用者有輸入資料才新增li
		if (todo.length>0){
			var todo ={
				is_complete:false,
				content:todo,
			};
			var li = todoTemplate(todo);
			$(this).closest('li').before(li);

		}
		$(this).empty()
		// clear new todo item
	});
});