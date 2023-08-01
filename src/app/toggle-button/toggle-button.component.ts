import { Component } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent {
  currentStatus: string = 'To-Do';
  statuses: string[] = ['To-Do', 'In Progress', 'Completed'];
  currentIndex: number = 0;

  toggleStatus(): void {
    this.currentIndex = (this.currentIndex + 1) % this.statuses.length;
    this.currentStatus = this.statuses[this.currentIndex];
    console.log('Current Status:', this.currentStatus);}
}
