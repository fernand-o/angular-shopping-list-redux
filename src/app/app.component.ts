import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  loadedPage = 'recipe';

  onNavigate(page: string) {
    this.loadedPage = page;
  }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyBz101SBDvTxZXUfzgH9NC7Zb_8W4v9xN4",
      authDomain: "ng-recipe-book-951ea.firebaseapp.com"
    });
  }
}
