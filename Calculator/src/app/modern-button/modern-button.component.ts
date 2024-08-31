import { Component, Input } from '@angular/core';

@Component({
  selector: 'modern-button',
  standalone: true,
  imports: [],
  templateUrl: './modern-button.component.html',
  styleUrl: './modern-button.component.scss'
})
export class ModernButtonComponent {
  @Input() buttonTitle: string;
  @Input() backgroundColor: string;
  @Input() foregroundColor: string;
  @Input() buttonWidthREM: number;
  @Input() buttonHeightREM: number;

  constructor(){
    this.buttonTitle = 'Title';
    this.backgroundColor = 'aqua';
    this.foregroundColor = 'white';
    this.buttonWidthREM = 1;
    this.buttonHeightREM = 1;
  }

}
