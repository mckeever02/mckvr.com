$(document).ready(function(){

	$('#inputField').bind("blur focus keydown keypress keyup", function(){recount();}); //binding the textarea events to a function
	$('input.submitButton').attr('disabled','disabled');//disabling submit button

	$('#moodmemoForm').submit(function(e){//preventing a form submit

		moodmemo();
		e.preventDefault();

	});

});


function recount()
{
	var maxlen=220; //set max length
	var current = maxlen-$('#inputField').val().length; //set current length
	$('.counter').html(current);


	if(current<0 || current==maxlen) //if current is equal to 0 or max length then disable submit
	{
		$('.counter').css('color','#D40D12');
		$('input.submitButton').attr('disabled','disabled').addClass('inact');
	}
	else //else enabled button
		$('input.submitButton').removeAttr('disabled').removeClass('inact');


	if(current<10) // if current is less than 10 change colour of counter
		$('.counter').css('color','#D40D12');

	else if(current<20) //else if current is less than 20 then change to this colour
		$('.counter').css('color','#5C0002');

	else //else leave at default colour
		$('.counter').css('color','#222');

}

function moodmemo()
{
	var submitData = $('#moodmemoForm').serialize(); //serialize the data in the form

	$('.counter').html('<img src="images/ajax_load.gif" width="16" height="16" style="padding:12px" alt="loading" />'); //replace the counter with a loading gif

	// $.ajax({ //post the moodmemo
	// 	type: "POST",
	// 	url: "submit-moodmemo.php",
	// 	data: submitData,
	// 	dataType: "html",
	// 	success: function(msg){

	// 		if(parseInt(msg)!=0) //if there is a moodmemo to be displayed
	// 		{
	// 			$('ul.statuses li:first-child').before(msg); //insert before previous message
	// 			$("ul.statuses:empty").append(msg); //or if there are none then append the message

	// 			$('#lastMoodmemo').html($('#inputField').val());

	// 			$('#inputField').val(''); //empty inputfield
	// 			recount(); //run recount function again
	// 		}
	// 	}



}

