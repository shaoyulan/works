$(document).ready(function(){
	var source = $('#event-template').html();
	var eventTemplate = Handlebars.compile(source);
	// page init load
	$.each(events, function(index, event){
		var eventUI = eventTemplate(event);
		var date = event['date'];
		$('#calendar').find('.date-block[data-date="'+date+'"]').find('.events').append(eventUI); //
	});

	var panel ={
		el:'#info-panel',
		selectedDateBlock:null,
		selectedEvent:null,
		
		//清空panel
		clear:function(){
			$(panel.el).find('input').val('');
			$(panel.el).find('textarea').val('');			
		},

		init:function(isNew,e){
			// clear form data
			panel.clear();
			panel.updateDate(e);

			// chose UI
			if (isNew) {
				$(panel.el).addClass('new').removeClass('update');
				panel.selectedDateBlock = $(e.currentTarget);
			}
			else {
				$(panel.el).addClass('update').removeClass('new');
				panel.selectedDateBlock = $(e.currentTarget).closest('.date-block');	
			}
		},
		open:function(isNew,e){
			panel.init(isNew,e);
			panel.hideError();
			$(panel.el).addClass('open').css({
				top:e.pageY+'px',
				left:e.pageX+'px',
			}).find('.title [name="title"]').focus(); //[name="title"] or [name] 這裡都可
		},
		close:function(){
			$('#info-panel').removeClass('open');
		},

		updateDate:function(e){
			// get data from .date-block
			if ($(e.currentTarget).is('.date-block'))
				var date = $(e.currentTarget).data('date');
			else
				var date = $(e.currentTarget).closest('.date-block').data('date');
			
			// get month from #calendar
			var year = $('#calendar').data('year');
			var month = $('#calendar').data('month');

			$(panel.el).find('.month').text(month);
			$(panel.el).find('.date').text(date);
			$(panel.el).find('[name="year"]').val(year);
			$(panel.el).find('[name="month"]').val(month);
			$(panel.el).find('[name="date"]').val(date);
		},
		showError:function(msg){
			$(panel.el).find('.error-msg').addClass('open')
				.find('.alert').text(msg);
		},
		hideError:function(e){
			$(panel.el).find('.error-msg').removeClass('open');
		},

	};

	$('.date-block')
		.dblclick(function(e){
			panel.open(true,e);
		})

		.on('dblclick','.event',function(e){
			e.stopPropagation();
			panel.open(false,e);

			panel.selectedEvent = $(e.currentTarget);

			var id =$(this).data('id');
			// AJAJ　call - get event detail
			$.post('event/read.php', {id: id}, function(data, textStatus, xhr) {
				// Insert data
				$(panel.el).find('[name="id"]').val(data.id);
				$(panel.el).find('[name="title"]').val(data.title);
				$(panel.el).find('[name="start_time"]').val(data.start_time);
				$(panel.el).find('[name="description"]').val(data.description);

			}).fail(function(xhr){
				panel.showError(xhr.responseText);
			});
			// load detail back to panel
	});


	$(panel.el)
		.on('click','button',function(e){
		  if ($(this).is('.create') || $(this).is('.update')){
		  	if ($(this).is('.create'))
		  		var action = 'event/create.php';
		  	if ($(this).is('.update'))
		  		var action = 'event/update.php';
		  	// collect data
		  	var data =$(panel.el).find('form').serialize();
		  	// AJAJ call - create API
		  	$.post(action,data)
		  		.done(function(data, textStatus, xhr){
		  			if($(e.currentTarget).is('.update'))
		  				panel.selectedEvent.remove();

  			  		alert('ok');
  				  	// insert into event
  				  	var eventUI = eventTemplate(data);
  				  	// TODO: insert with from time order
  				  	panel.selectedDateBlock.find('.event').each(function(index,event){
  				  		var eventFromTime = $(event).data('from').split(':');
  				  		var newEventFromTime = data.start_time.split(':');
  				  		if (eventFromTime[0]>newEventFromTime[0] || (eventFromTime[0]==newEventFromTime[0] && eventFromTime[1]>newEventFromTime[1])){
  				  			$(event).before(eventUI);
  				  			return false; // 終止迴圈
  				  		}
  				  	});
  				  	// no one later than me
  				  		// append new one
  				  	if (panel.selectedDateBlock.find('.event[data-id]="'+data.id+'"').lenght==0){
  				  		panel.selectedDateBlock.find('.events').append(eventUI);
  				  	}
  				  	panel.close();
		  		});
		  		.fail(function(xhr, textStatus, errorThrown){
		  			panel.shwError(xhr.responseText);
		  			k = xhr.responseText;
		  		})
		  }

		  // if ($(this).is('.update')){
		  // 	// collect form data
		  // 	var data =$(panel.el).find('form').serialize();
		  // 	// AJAJ call - create API
		  // 	$.post('event/update.php',data)
		  // 		.done(function(data, textStatus, xhr){
  		// 		  	// insert into event
  		// 		  	var eventUI = eventTemplate(data);
  		// 		  	// TODO: insert with from time order
  		// 		  	panel.selectedDateBlock.find('.event').each(function(index,event){
  		// 		  		var eventFromTime = $(event).data('from').split(':');
  		// 		  		var newEventFromTime = data.start_time.split(':');
  		// 		  		if (eventFromTime[0]>newEventFromTime[0] || (eventFromTime[0]==newEventFromTime[0] && eventFromTime[1]>newEventFromTime[1])){
  		// 		  			$(event).before(eventUI);
  		// 		  			return false; // 終止迴圈
  		// 		  		}
  		// 		  	});
  		// 		  	// no one later than me
  		// 		  		// append new one
  		// 		  	if (panel.selectedDateBlock.find('.event[data-id]="'+data.id+'"').lenght==0){
  		// 		  		panel.selectedDateBlock.find('.events').append(eventUI);
  		// 		  	}
  		// 		  	panel.close();
		  // 		});
		  // 		.fail(function(xhr, textStatus, errorThrown){
		  // 			panel.shwError(xhr.responseText);
		  // 			k = xhr.responseText;
		  // 		})
		  // }

		  if ($(this).is('.cancel')){
		  	panel.close();
		  }

		  if ($(this).is('.delete')){
		  	var confirm = confirm('Sure to Delete?')
		  	if(confirm){
		  		// id
		  		var id = panel.selectedEvent.data('id');
		  		// AJAX call - delete.php with id
		  		$.post('event/delete.php', {id: id},)
		  		.done(function(){
		  			// remove event from calendear
		  			panel.selectedEvent.remove();
		  			panel.close();
		  		});
		  	}
		  }
		})

		.on('click','.close',function(e){
			$('button.cancel').click();
		});
});