import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  addTask: boolean = false;
  showPrizes: boolean = false;

  addTaskFunc() { //toggles display of new Task
    if (this.showPrizes) this.showPrizes = !this.showPrizes;
    this.addTask = !this.addTask;
  }

  showPrizesFunc() { //toggles display of Prizes
    if (this.addTask) this.addTask = !this.addTask
    this.showPrizes = !this.showPrizes;
  }

  constructor() { }

}
