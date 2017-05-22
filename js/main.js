(function() {

  // function a() {
  //   var b = baffle('#logo').start().set({
  //     characters: '░█▓ ▓▒░',
  //     speed: 40
  //   }).text(function (currentText) {
  //     return "Michael Mckeever";
  //   });
  //
  //   setTimeout(function () {
  //     b.reveal(500);
  //   }, 500);
  // }
  //
  // function b() {
  //   var b = baffle('#logo').start().set({
  //     characters: '░█▓ ▓▒░',
  //     speed: 40
  //   }).text(function (currentText) {
  //     return "mckvr";
  //   });
  //
  //   setTimeout(function () {
  //     b.reveal(500);
  //   }, 500);
  // }

  // document.getElementById('logo').onmouseover=function(){a();};
  //
  // document.getElementById('logo').onmouseleave=function(){b();};

  //window.onload=function(){b();};

  var about1 = document.querySelector('#about1'),
      show1 = document.querySelector('#show1'),
      about2 = document.querySelector('#about2'),
      show2 = document.querySelector('#show2');


  show1.addEventListener("click", function(){
    about1.style.display = "block";
    show1.style.display = "none";
  });



  show2.addEventListener("click", function(song){
    // const LastFM = require('lastfm-listener');
    // const options = {
    //     api_key: '46f5b9163fd5a8bbe79e41d081158886',
    //     username: 'mckeever02',
    //     rate: 5,
    //     alert_intial: true,
    //     only_if_playing: true
    // };
    //
    // let lastFM = new LastFM(options);
    //
    // lastFM.getLatestSong(function(song) {
    //   var songName = song.name;
    //   var artistName = song.artist["#text"];
    //   var songURL = song.url;
    //   var a =  document.getElementById('songURL');
    //   console.log(songName); // "Never Gonna Give You Up"
    //   console.log(artistName); // "Rick Astley"
    //   console.log(song.nowplaying); // True
    //   console.log(song.url);
    //   console.log(song.url);
    //   document.getElementById('songName').innerHTML = songName;
    //   document.getElementById('artistName').innerHTML = artistName;
    //   a.href = songURL;
    // });
    // lastFM.start();
    about2.style.display = "block";
    show2.style.display = "none";

  });





})();
