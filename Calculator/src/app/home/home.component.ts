import { Component } from '@angular/core';
import { ModernButtonComponent } from '../modern-button/modern-button.component';
import { CalculationService } from '../Services/calculation.service';

@Component({
  selector: 'home',
  standalone: true,
  imports: [ModernButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public exercise: string;
  public exreciseResult: string;

  public exerciseBackgroundcolor: string;

  public digitButtonsTitles: string[];
  public digitButtonsBackgroundColors: string;
  public operationButtonsTitles: string[];
  public operationButtonsBackgroundColors: string;
  public deleteOperationButtonsTitles: string[];
  public deleteOperationButtonsBackgroundColors: string;
  
  public screenBackgroundColor: string;

  constructor(
    private readonly calculationService: CalculationService
  ){
    this.exerciseBackgroundcolor = '#808080';
    this.digitButtonsBackgroundColors = '#2d302e';
    this.digitButtonsTitles =
    [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.' ];
    
    this.operationButtonsBackgroundColors = '#b05f09';
    this.operationButtonsTitles =
    [ '÷', '×', '-', '+', '=' ];

    this.deleteOperationButtonsBackgroundColors = '#474a48';
    this.deleteOperationButtonsTitles =
    [ 'c', '←' ];

    this.screenBackgroundColor = '#1c1917';

    this.exercise = '';
    this.exreciseResult = '';
  }

  public addCharacterToExercise(characterToAdd: string): void {
    if(characterToAdd.length != 1 ||
       !this.characterIsApproved(characterToAdd)
    )
      return;
    
    this.exercise += characterToAdd;
    if(characterToAdd === this.operationButtonsTitles[4])
      this.exreciseResult = this.calculationService.calculateExercise(this.exercise);
  }

  private characterIsApproved(characterToAdd: string): boolean {
    switch(characterToAdd){
      case '':
        return this.digitButtonsTitles
                   .slice(0, this.digitButtonsTitles.length - 1)
                   .includes(characterToAdd);
      case this.operationButtonsTitles[0]:
      case this.operationButtonsTitles[1]:
      case this.operationButtonsTitles[2]:
      case this.operationButtonsTitles[3]:
      case this.operationButtonsTitles[4]:
      case this.digitButtonsTitles[this.digitButtonsTitles.length - 1]:
        return this.digitButtonsTitles
                   .slice(0, this.digitButtonsTitles.length - 1)
                   .includes(this.exercise[this.exercise.length - 1]);
    }
    return true;
  }

  public clearExercise(): void {
    this.exercise = '';
  }

  public deleteLastCharacter(): void {
    if(this.exercise.length > 0)
      this.exercise = this.exercise.slice(0, this.exercise.length - 1);
  }




}
