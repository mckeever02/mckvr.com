/*!
 * baffle 0.3.6 - A tiny javascript library for obfuscating and revealing text in DOM elements.
 * Copyright (c) 2016 Cam Wiegert <cam@camwiegert.com> - https://camwiegert.github.io/baffle
 * License: MIT
 */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.baffle=e():t.baffle=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var i=n(2),o=r(i);t.exports=o["default"]},function(t,e){"use strict";function n(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}function r(t,e){return t.split("").map(e).join("")}function i(t){return t[Math.floor(Math.random()*t.length)]}function o(t,e){for(var n=0,r=t.length;n<r;n++)e(t[n],n)}function u(t){return t.map(function(t,e){return!!t&&e}).filter(function(t){return t!==!1})}function s(t){return"string"==typeof t?[].slice.call(document.querySelectorAll(t)):[NodeList,HTMLCollection].some(function(e){return t instanceof e})?[].slice.call(t):t.nodeType?[t]:t}Object.defineProperty(e,"__esModule",{value:!0}),e.extend=n,e.mapString=r,e.sample=i,e.each=o,e.getTruthyIndices=u,e.getElements=s},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),u=n(3),s=r(u),c={characters:"AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz~!@#$%^&*()-+=[]{}|;:,./<>?",exclude:[" "],speed:50},a=function(){function t(e,n){i(this,t),this.options=(0,o.extend)(Object.create(c),n),this.elements=(0,o.getElements)(e).map(s["default"]),this.running=!1}return t.prototype.once=function(){var t=this;return(0,o.each)(this.elements,function(e){return e.write(t.options.characters,t.options.exclude)}),this.running=!0,this},t.prototype.start=function(){var t=this;return clearInterval(this.interval),(0,o.each)(this.elements,function(t){return t.init()}),this.interval=setInterval(function(){return t.once()},this.options.speed),this.running=!0,this},t.prototype.stop=function(){return clearInterval(this.interval),this.running=!1,this},t.prototype.set=function(t){return(0,o.extend)(this.options,t),this.running&&this.start(),this},t.prototype.text=function(t){var e=this;return(0,o.each)(this.elements,function(n){n.text(t(n.value)),e.running||n.write()}),this},t.prototype.reveal=function(){var t=this,e=arguments.length<=0||void 0===arguments[0]?0:arguments[0],n=arguments.length<=1||void 0===arguments[1]?0:arguments[1],r=e/this.options.speed||1,i=function(){clearInterval(t.interval),t.running=!0,t.interval=setInterval(function(){var e=t.elements.filter(function(t){return!t.bitmap.every(function(t){return!t})});(0,o.each)(e,function(e){var n=Math.ceil(e.value.length/r);e.decay(n).write(t.options.characters,t.options.exclude)}),e.length||(t.stop(),(0,o.each)(t.elements,function(t){return t.init()}))},t.options.speed)};return setTimeout(i,n),this},t}();e["default"]=function(t,e){return new a(t,e)}},function(t,e,n){"use strict";function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var u=n(1),s=function(){function t(e){o(this,t),this.value=e,this.init()}return t.prototype.init=function(){return this.bitmap=this.value.split("").map(function(){return 1}),this},t.prototype.render=function(){var t=this,e=arguments.length<=0||void 0===arguments[0]?[]:arguments[0],n=arguments.length<=1||void 0===arguments[1]?[]:arguments[1];return e.length?(0,u.mapString)(this.value,function(r,i){return n.indexOf(r)>-1?r:t.bitmap[i]?(0,u.sample)(e):r}):this.value},t.prototype.decay=function(){for(var t=arguments.length<=0||void 0===arguments[0]?1:arguments[0];t--;){var e=(0,u.getTruthyIndices)(this.bitmap);this.bitmap[(0,u.sample)(e)]=0}return this},t.prototype.text=function(){var t=arguments.length<=0||void 0===arguments[0]?this.value:arguments[0];return this.value=t,this.init(),this},t}(),c=function(t){function e(n){o(this,e);var i=r(this,t.call(this,n.textContent));return i.element=n,i}return i(e,t),e.prototype.write=function(t,e){return this.element.textContent=this.render(t,e),this},e}(s);e["default"]=function(t){return new c(t)}}])});
/**
 *
 * @name lastfm-listener
 * @author Lachlan 
 * @license MIT
 * @description Fires events when a new song is played
 *
 **/

// ES6 😻
'use strict';

// Dependencies
const request = require('request');
const EventEmitter = require('events').EventEmitter;

class LastFMListener extends EventEmitter
{
	
	constructor(config) {
		
		// Call the EventEmitter constructor. Else this won't exist lel
		super();
		
		// Just some default stuff yo
		this.config = {
			api_key: config.api_key || '',
			username: config.username || '',
			rate: config.rate || 5,
			alert_initial: (typeof config.alert_initial != 'boolean' ? true : config.alert_initial),
			only_if_playing: (typeof config.only_if_playing != 'boolean' ? false : config.only_if_playing)
		};
		
		// Here's our api url!
		this.api_url = `http://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${this.config.username}&api_key=${this.config.api_key}&format=json&limit=1`;
		
		// Let's make some dummies
		this.latest_song = null;
		this.interval_object = null;
		
		// Let's just get our latest song right now tbh
		this.getLatestSong((song) => {

			// You want an alert for the inital song loaded, ok sure we'll give it to you.
			if(this.config.alert_initial) {
				this.emit('song', song);
			} else {
				this.latest_song = song;
			}

		});
		
		// Let's just update the latest song when we get a new one.
		this.on('song', (song) => {
			this.latest_song = song;
		});
		
	}
	
	getLatestSong(callback) {
		
		// Let's cache ourselves.
		let self = this;
		
		// Construct a request 
		request({
			url: self.api_url,
			method: 'GET',
			json: true
		}, function (err, res, body) {
			
			// RIP 😢
			if(err) {
				return console.log('Error getting latest song: ', err);
			}
			
			let latest_song = body.recenttracks.track[0];
			
			callback(latest_song);
			
		});
		
	}
	
	checkSong(callback) {
		
		if(typeof callback != 'function') {
			callback = function () {
				// lol k
			};
		}
		
		this.getLatestSong((song) => {

			// Self-calling anonymous functions 👍
			song.now_playing = (() => {

				// Does we has attributes?
				if(song.hasOwnProperty('@attr')) {
					// Mkay... Now do we have the nowplaying attributes?
					if(song['@attr'].hasOwnProperty('nowplaying')) {
						// Ayy :D Now is it true?
						if(song['@attr'].nowplaying == 'true') {
							// Coo' Coo' let's return true
							return true;
						}
					}
				}

				// If any of that wasn't matched then let's say bye bye
				return false;

			})();
			
			// if they're picky about it being played, and it's not playing then let's not give them anything
			if(this.config.only_if_playing && !song.nowplaying) {
				return callback(null);
			}

			// If it's a new song 🎵
			if(song.artist['#text'] != this.latest_song.artist['#text'] || song.name != this.latest_song.name) {
				this.emit('song', song);
				return callback(song);
			} else {
				return callback(null);
			}
			
		});
		
	}
	
	// Let's get this party started 
	start() {
		this.interval_object = setInterval(() => {
			this.checkSong();
		}, this.config.rate * 1000);
	}
	
	// NOOO rip the party
	stop() {
		clearInterval(this.interval_object);
	}
	
}

// Bye bye, you're being exported
module.exports = LastFMListener;




// Why are you still reading this

(function() {

  document.getElementById('logo').onmouseover=function(){a();};

  document.getElementById('logo').onmouseleave=function(){b();};




  function a(){
    var b = baffle('#logo')
      .start()
      .set({
          characters: '░█▓ ▓▒░',
          speed: 40
      })
      .text(currentText => "Michael Mckeever")

      setTimeout(() => {
        b.reveal(500)
      }, 500)
  }

  function b(){
    var b = baffle('#logo')
      .start()
      .set({
          characters: '░█▓ ▓▒░',
          speed: 40
      })
      .text(currentText => "mckvr")

      setTimeout(() => {
        b.reveal(500)
      }, 500)
  }

  var about1 = document.querySelector('#about1'),
      show1 = document.querySelector('#show1'),
      about2 = document.querySelector('#about2'),
      show2 = document.querySelector('#show2');


  show1.addEventListener("click", function(){
    about1.style.display = "block";
    show1.style.display = "none";
  });

  show2.addEventListener("click", function(){
    about2.style.display = "block";
    show2.style.display = "none";
  });


  const LastFM = require('lastfm-listener');
  const options = {
      api_key: 'http://www.last.fm/api/1292bb2c17448545b7e87339cc20dc41',
      username: 'mckeever02',
      rate: 5,
      alert_intial: true,
      only_if_playing: true
  };

  let lastFM = new LastFM(options);

  lastFM.getLatestSong(function(song) {
    console.log(song.name); // "Never Gonna Give You Up"
    console.log(song.artist); // "Rick Astley"
    console.log(song.nowplaying); // True
  });




})();
