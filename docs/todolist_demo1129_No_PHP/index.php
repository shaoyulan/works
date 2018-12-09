<?php include('header.php') ?>

<div id="panel">
	<h1>Todo list</h1>

	<div id="todo-list">
		<ul>
			<li class="complete">
				<div class="checkbox"></div>
				<div class="content" >wefweafwafwef</div>
				<div class="actions">
					<div class="delete">x</div>
				</div>
			</li>
			<li>
				<div class="checkbox"></div>
				<div class="content" >waefwfewafwe</div>
				<div class="actions">
					<div class="delete">x</div>
				</div>
			</li>
			<li>
				<div class="checkbox"></div>
				<div class="content" >wafwawefweaf</div>
				<div class="actions">
					<div class="delete">x</div>
				</div>
			</li>
			<li class="new">
				<div class="checkbox"></div>
				<div class="content" ></div>
			</li>
		</ul>
	</div>
</div>
<script id="todo-list-item-template" type="text/x-handlebars-template">
  <li class="{{#if is_complete}}complete{{/if}}">
  	<div class="checkbox"></div>
  	<div class="content" contenteditable="true">{{content}}</div>
  	<div class="actions">
  		<div class="delete">x</div>
  	</div>
  </li>
</script>

<?php include('footer.php') ?>
	
