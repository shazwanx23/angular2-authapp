import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

import { options } from '../auth.options';

declare var Auth0Lock: any;
@Injectable() 
export class Auth {
	//configre Auth0
	lock = new Auth0Lock('H1uvaapYnFaoCQOX554HxvxN78O61F1v', 'shazwax23.eu.auth0.com', options);

	constructor() {
		   // Add callback for lock `authenticated` event
	    this.lock.on("authenticated", (authResult: any) => {
	    	this.lock.getProfile(authResult.idToken, function(error: any, profile: any) {
	    		if(error) {
	    			throw new Error(error);
	    		}
	    		//Set Profiel
	      		localStorage.setItem('profile', JSON.stringify(profile));	    		
	    		//Set Token
	      		localStorage.setItem('id_token', authResult.idToken);
	    	})
	    });
	}

	public login() {
	    // Call the show method to display the widget.
	    this.lock.show();
	  }

	public authenticated() {
	// Check if there's an unexpired JWT
	// This searches for an item in localStorage with key == 'id_token'
		return tokenNotExpired();
	}

	public logout() {
	// Remove info from localStorage
		localStorage.removeItem('id_token');
		localStorage.removeItem('profile');
	}
}