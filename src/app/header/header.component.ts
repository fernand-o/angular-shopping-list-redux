import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService) { }
  onSave() {
    this.dataStorageService.storeRecipes()
      .subscribe(
      (response: Response) => console.log(response)
      );
  }

  onFetch() {
    this.dataStorageService.getRecipes();
  }
}
