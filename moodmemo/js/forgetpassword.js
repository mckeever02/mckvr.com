$(document).ready(function(){
	$("#forgetpassword-form").validate({
		submitHandler : function(e) {
		    $(form).submit();
			
		},
		rules : {
			email : {
				required : true,
				email: true,
				remote:"check-email.php"
			}
		},
		messages : {
			email : {
				required : "Please enter email",
				remote : "Email not exists"
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