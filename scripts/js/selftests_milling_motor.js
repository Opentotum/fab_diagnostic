selftests_milling_motor = {
	
	start: function () {
		console.log('template: START');
		
		// init code
		
		
		window.customNotificationsHandler = selftests_milling_motor.customNotificationsHandler;
	},
	
	end: function () {
		console.log('template: END');
		
		window.customNotificationsHandler = undefined;
		
		// cleanup code
		
		/*$("#testcaseModal").modal('hide');
		$('#testcaseModal').unbind('shown.bs.modal');
		$("#modal-graph").hide();
		$("#modal-trace").hide();*/
	},
	
	sendResponse: function (id, response)
	{
		trigger_data = [id, response];
		
		console.log('sendResponse', id, response);
		
		$.ajax({
			type: 'post',
			url: '/fabui/control/trigger/custom',
			data: {'data' : trigger_data},
			dataType: 'json'
		}).done(function(data) {
			console.log('Trigger sent');
		});
	},
	
	customNotificationsHandler: function(obj) {
		
		if(obj.type == "selftest")
		{
			console.log("Custom ws handler:", obj);
			console.log(obj.data);
			
			switch(obj.data.type)
			{
				case "confirm": {
					var id = obj.data.id;
					var msg = obj.data.msg;
					var buttons = obj.data.buttons;
					
					$.SmartMessageBox({
							title: "<i class='fa fa-warning'></i> " + msg,
							content: '',
							buttons: buttons
						}, function(ButtonPressed) {
							console.log('ButtonPressed', ButtonPressed);
							selftests_milling_motor.sendResponse(id, ButtonPressed);
							
							$("#modal-trace").show();
							$("#testcaseModal").modal({ keyboard: false, backdrop: 'static' });
							$("#testcaseModal").modal('show');
							
						});
					
					} break;
				case "question": {
					var id = obj.data.id;
					var msg = obj.data.msg;
					var buttons = obj.data.buttons;
					
					$("#testcaseModal").modal('hide');
					$("#modal-trace").hide();
					
					$.SmartMessageBox({
							title: "<i class='fa fa-question-circle'></i> " + msg,
							content: '',
							buttons: buttons
						}, function(ButtonPressed) {
							console.log('ButtonPressed', ButtonPressed);
							selftests_milling_motor.sendResponse(id, ButtonPressed);
						});
					
					} break;
			}
		}

	},
};
