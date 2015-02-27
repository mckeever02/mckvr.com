$(document).ready(function(){
	
	$("#account-form").validate({
		submitHandler : function(e) {
		    $(form).submit();
		},
		rules : {
			old_password : {
				required : true,
				remote   : {
						url: "check-email.php",
						type: "post",
						data: {
							password: function() {
								return $( "#old_password" ).val();
							},
							email: function() {
								return $( "#email" ).val();
							}
						}
				}
			},
			password : {
				required : true
			},
			confirm_password : {
				required : true,
				equalTo: "#password"
			}
		},
		messages : {
			old_password : {
				required : "Please enter current password",
				remote : "Please enter correct current password"
			},
			password : {
				required : "Please enter password"
			},
			confirm_password : {
				required : "Please enter confirm password",
				equalTo: "Password and confirm password doesn't match"
			}
		},
		errorPlacement : function(error, element) {
			$(element).closest('div').find('.help-block').html(error.html());
		},
		highlight : function(element) {
			$(element).closest('div').removeClass('has-success').addClass('has-error');
		},
		unhighlight: function(element, errorClass, validClass) {
			 $(element).closest('div').removeClass('has-error').addClass('has-success');
			 $(element).closest('div').find('.help-block').html('');
		}
	});
	
	
});