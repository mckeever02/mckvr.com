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
