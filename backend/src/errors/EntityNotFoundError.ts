import AppError from "./AppError";


export class EntityNotFoundError extends AppError{
    constructor(message:string){
        super(message,404)
    }
}