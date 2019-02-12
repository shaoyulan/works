<?php include('header.php') ?>
<?php include('todo/data.php') ?>

<div id="panel">
	<h1>Todo list</h1>

	<div id="todo-list">
		<ul>
			<li class="new">
				<div class="checkbox"></div>
				<div class="content" ></div>
			</li>
		</ul>
	</div>
</div>
<script id="todo-list-item-template" type="text/x-handlebars-template">
  <li class="{{#if is_complete}}complete{{/if}}" data-id="{{id}}">
  	<div class="checkbox"></div>
  	<div class="content" contenteditable="true">{{content}}</div>
  	<div class="actions">
  		<div class="delete">x</div>
  	</div>
  </li>
</script>

<?php include('footer.php') ?>
	
