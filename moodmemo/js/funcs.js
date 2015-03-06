/*
UserCake Version: 2.0.2
http://usercake.com
*/
// function showHide(div){
// 	if(document.getElementById(div).style.display = 'block'){
// 		document.getElementById(div).style.display = 'none';
// 	}else{
// 		document.getElementById(div).style.display = 'block';
// 	}
// }

$(document).on('click', '.close', function () {
    $(this).parent('div').fadeOut('fast');
});

$( ".show-menu" ).click(function() {
  $( ".item-functions" ).fadeToggle( "fast");
});




$(".form-control").on('focus blur', function(){
     $(this).siblings('span').toggleClass('focused');
})

// function for deleting record
$(function(){
  $(document).on('click','.ajaxDelete',function(){
  var del_id= $(this).attr('id');
  var $ele = $(this).parent().parent();
  $.ajax({
      type:'POST',
      url:'models/delete-moodmemo.php',
      data:{'del_id':del_id},
      success: function(data){
           if(data=="YES"){
            if(confirm("Are you sure you want to delete this moodmemo?"))
              $ele.fadeOut('slow').remove();
           }else{
                  alert("can't delete the row")
           }
       }

      });
  });
});

//call the waypoints plugin to create sticky nav
$('.sticky-nav').waypoint('sticky');


$(function(){
  $(document).on('click','.ajaxFavourite',function(){

    // Configure those variables as appropriate

    // var divid = 'status';
    var favid= $(this).attr('id');
    // var url = 'addremove.php';

  $.ajax({
      type:'POST',
      url:'addremove.php',
      data:{'favid':favid},
      success: function(data){
           if(data=="YES"){
              alert("Done")
           }else{
              alert("can't favourite")
           }
       }

      });


    // The XMLHttpRequest object

    // var xmlHttp;
    // try{
    // xmlHttp=new XMLHttpRequest(); // Firefox, Opera 8.0+, Safari
    // }
    // catch (e){
    // try{
    // xmlHttp=new ActiveXObject("Msxml2.XMLHTTP"); // Internet Explorer
    // }
    // catch (e){
    // try{
    // xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
    // }
    // catch (e){
    // alert("Your browser does not support AJAX.");
    // return false;
    // }
    // }
    // }

    // // Generate timestamp for preventing IE caching the GET request

    // fetch_unix_timestamp = function()
    // {
    // return parseInt(new Date().getTime().toString().substring(0, 10))
    // }

    // var timestamp = fetch_unix_timestamp();
    // var nocacheurl = url+"?t="+timestamp;


    // // This code sends the variables through AJAX and gets the response

    // xmlHttp.onreadystatechange=function(){
    // if(xmlHttp.readyState!=4){
    // document.getElementById(divid).innerHTML='<img src="images/spinner.gif">  Wait...';
    // }
    // if(xmlHttp.readyState==4){
    // document.getElementById(divid).innerHTML=xmlHttp.responseText;
    // }
    // }
    // xmlHttp.open("GET",nocacheurl+"&favid="+favid,true);
    // xmlHttp.send(favid);


    // // Finally, some code for button toggle

    // var button = document.getElementById('button');

    // switch(button.name)
    // {
    // case 'button0':
    //   button.text = 'Unfavourite';
    //   button.name = 'button1';
    //   break;
    // case 'button1':
    //   button.text = 'Favourite';
    //   button.name = 'button0';
    //   break;
    // }

  });
});

// function for adding and removing a favourite
// function addremove(id){

//   // Configure those variables as appropriate

//   var divid = 'status';
//   var url = 'addremove.php';


//   // The XMLHttpRequest object

//   var xmlHttp;
//   try{
//   xmlHttp=new XMLHttpRequest(); // Firefox, Opera 8.0+, Safari
//   }
//   catch (e){
//   try{
//   xmlHttp=new ActiveXObject("Msxml2.XMLHTTP"); // Internet Explorer
//   }
//   catch (e){
//   try{
//   xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
//   }
//   catch (e){
//   alert("Your browser does not support AJAX.");
//   return false;
//   }
//   }
//   }

//   // Generate timestamp for preventing IE caching the GET request

//   fetch_unix_timestamp = function()
//   {
//   return parseInt(new Date().getTime().toString().substring(0, 10))
//   }

//   var timestamp = fetch_unix_timestamp();
//   var nocacheurl = url+"?t="+timestamp;


//   // This code sends the variables through AJAX and gets the response

//   xmlHttp.onreadystatechange=function(){
//   if(xmlHttp.readyState!=4){
//   document.getElementById(divid).innerHTML='<img src="images/spinner.gif">  Wait...';
//   }
//   if(xmlHttp.readyState==4){
//   document.getElementById(divid).innerHTML=xmlHttp.responseText;
//   }
//   }
//   xmlHttp.open("GET",nocacheurl+"&id="+id,true);
//   xmlHttp.send(null);


//   // Finally, some code for button toggle

//   var button = document.getElementById('button');

//   switch(button.name)
//   {
//   case 'button0':
//     button.text = 'Unfavourite';
//     button.name = 'button1';
//     break;
//   case 'button1':
//     button.text = 'Favourite';
//     button.name = 'button0';
//     break;
//   }

// }
