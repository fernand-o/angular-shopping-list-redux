import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router) { }

  signUpUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(
      error => console.log(error)
    )
  }

  signInUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
      response => {
        this.getUserTokenFromStorage();
        this.router.navigate(['/']);
      }
      ).catch(
      error => console.log(error)
      )
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  private getUserTokenFromStorage() {
    firebase.auth().currentUser.getToken().then(
      (token: string) => {
        this.token = token;
      }
    )
  }

  getToken() {
    this.getUserTokenFromStorage();
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}