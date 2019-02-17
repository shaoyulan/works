<?php include('header.php') ?>
<?php include('data.php') ?>
<?php include('template.php') ?>



<div id="calendar" data-year="<?php echo date('Y') ?>" data-month='<?php echo date('m') ?>'>
	<div id="header">
		<?php echo date('Y') ?>/<?php echo date('m') ?>
	</div>
	<div id="days" class="clearfix">
		<div class="day">SUN</div>
		<div class="day">MON</div>
		<div class="day">TUE</div>
		<div class="day">WED</div>
		<div class="day">THU</div>
		<div class="day">FRI</div>
		<div class="day">SAT</div>
	</div>

	<div id="dates" class="clearfix" > <!-- 加上clearfix 避免崩塌 -->
		<?php foreach ($dates as $key => $date): ?>
			<div class="date-block <?php echo (is_null($date))? 'empty':'' ?>" data-date='<?php echo $date ?>'>
				<div class="date"><?php echo $date ?></div>
			</div>
		<?php endforeach ?>
	</div>
</div>

<div id="info-panel" class="update">
	<div class="close">X</div>
	<form >
		<input type="hidden" name ="id"> 
		<div class="title">
			<label for="">event</label><br>
			<input type="text" name='title'>
		</div>
		<div class="erroer-msg">
			<div class="alert alert-danger"></div>
		</div>
		<div class="time-picker">
			<div class="selected-date">
				<span class="month"></span>/<span class="date"></span>
				<input type="hidden" name ="year">
				<input type="hidden" name ="month"> <!-- 蒐集span month/date的資料 -->
				<input type="hidden" name ="date"> 

			</div>
			<div class="from">
				<label for="from">from</label><br>
				<input id="from" type="time" name="start_time">
			</div>
			<div class="to">
				<label for="">to</label><br>
				<input id="to" type="time" name="end_time">
			</div>
		</div>
		<div class="description">
			<label>description</label><br>
			<textarea name="description" id="description" ></textarea>
		</div>
	</form>
	
	<div class="buttons">
		<button class="create">create</button>
		<button class="update">update</button>
		<button class="cancel">cancel</button>
		<button class="delete">delete</button>
	</div>
</div>

<?php include('footer.php') ?>

