import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  private readonly operations: string[] = [ '÷', '×', '-', '+' ];

  constructor() { }

  public calculateExercise(expression: string): string {
    let postfixExpression: string[];
    let result: string;

    expression = expression.slice(0, expression.length - 1);
    postfixExpression = this.infixToPostfix(expression);
    result = this.solvePostfixExpression(postfixExpression);

    if(result.length > 10)
      result = result.slice(0, 11);

    return result;
  }



  private solvePostfixExpression(postfixExpression: string[]): string {
    let operands: number[] = [];
    let index: number = 0;
    let operation: string;
    let firstOperand: number, secondOperand: number;
    let temporaryResult: string;

    while(index < postfixExpression.length) {
      if(this.operations.includes(postfixExpression[index])) {
        operation = postfixExpression[index++];
        secondOperand = Number(operands.pop());
        firstOperand = Number(operands.pop());;
        temporaryResult = this.calculateSimpleExpression(firstOperand, secondOperand, operation);
        if(temporaryResult === 'ERR')
          return temporaryResult;
        operands.push(Number(temporaryResult));
      }
      else {
        operands.push(Number(postfixExpression[index++]));
      }
    }
    return String(operands.pop());
  }
  private calculateSimpleExpression(operand1: number, operand2: number, operation: string): string {
    switch(operation) {
      case this.operations[0]:
        if(operand2 === 0)
          return 'ERR';
        return String(operand1 / operand2);
      case this.operations[1]:
        return String(operand1 * operand2);
      case this.operations[2]:
        return String(operand1 - operand2);
        case this.operations[3]:
      return String(operand1 + operand2);
    }
    return 'ERR';
  }

  private infixToPostfix(expression: string): string[] {
    let postfixExpression: string[] = [];
    let operationsStack: string[] = [];
    let index = 0;

    while (index < expression.length) {
      if(this.operations.includes(expression[index])) {
        this.operationManager(postfixExpression, operationsStack, expression[index]);
        index++;
      }
      else {
        this.numberManager(postfixExpression, expression, index);
        index += postfixExpression[postfixExpression.length - 1].length;
      }
    }

    while (operationsStack.length > 0)
      postfixExpression.push(String(operationsStack.pop()));

    return postfixExpression;
  }
  private numberManager(postfixExpression: string[], expression: string, index: number): void {
    let num: number = 0;
    let hasFloatingPoint: boolean = false;
    let digitsAfterFloatingPoint = 1;
    while(!this.operations.includes(expression[index]) &&
          index < expression.length) {
      if (expression[index] === '.') {
        hasFloatingPoint = true;
        index++;
      }

      if(hasFloatingPoint) {
        digitsAfterFloatingPoint *= 10;
        num += Number(expression[index++]) / digitsAfterFloatingPoint;
      }
      else
        num = num * 10 + Number(expression[index++]);
    }

    postfixExpression.push(String(num));
  }

  private operationManager(postfixExpression: string[], operationsStack: string[], operation: string): void {
    if(operationsStack.length === 0) {
      operationsStack.push(operation);
      return;
    }

    while(operationsStack.length > 0 &&
          this.operationPrecedence(operation) <= this.operationPrecedence(operationsStack[operationsStack.length - 1])) {
      postfixExpression.push(String(operationsStack.pop()));
    }

    operationsStack.push(operation);
  }
  private operationPrecedence(operation: string): number {
    return operation === this.operations[0] || operation === this.operations[1] ? 2 : 1;
  }


}
