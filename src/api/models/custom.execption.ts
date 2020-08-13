export class CustomException extends Error{
  
    statudCode!: Number;
    constructor(message:string, statudCode:number) {
      super(message);
      this.statudCode = statudCode;
    }
}