import "reflect-metadata"
import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, Length, Max, Min, } from "class-validator";

export class PaginatedPlayerFilters{
    @IsOptional()
    @Type(() => Number) // convierte el string a number
    @IsInt({ message: 'El número de página debe ser un entero' })
    @Min(0,{message:"Page debe ser un número mayor a 0"})
    page?:number;
    @IsOptional()
    @Type(() => Number) // convierte el string a number
    @IsInt({ message: 'El número de página debe ser un entero' })
    @Min(1,{message:"Page debe ser un número mayor a 0"})
    pageSize?:number;
    @IsOptional()
    @IsString()
    orderBy?:string
    @IsOptional()
    @IsIn(["asc","desc"],{message:"orderDirection debe ser 'asc' o 'desc'"})
    orderDirection?="asc"
    @IsOptional()
    @IsString()
    @Length(1, 100, { message: 'El nombre completo debe tener entre 1 y 100 caracteres' })
    longName?:string;
    @IsOptional()
    team?:string
    @IsOptional()
    position?:string
    @Type(() => Number) // convierte el string a number
    @IsOptional()
    @IsIn([15,16,17,18,19,20,21,22,23])
    fifaVersion?:number;
    @IsOptional()
    fifaUpdate?:boolean
    @IsOptional()
    @Type(() => Number) 
    @isOptionalNumericParam()
    minOverall?:number
    @Type(() => Number) 
    @isOptionalNumericParam()
    minPace?:number
    @Type(() => Number) 
    @isOptionalNumericParam()
    minShooting?:number
    @Type(() => Number) 
    @isOptionalNumericParam()
    minPassing?:number
    @Type(() => Number) 
    @isOptionalNumericParam()
    minDribbling?:number
    @Type(() => Number) 
    @isOptionalNumericParam()
    minDefending?:number
    @Type(() => Number) 
    @isOptionalNumericParam()
    minPhysic?:number
}

function isOptionalNumericParam(){
  
  return function isOptionalNumericParam(target:any, propertyName:string) {
    const message= `${propertyName} debe ser un número entre 1 y 100`
    IsOptional()(target,propertyName)
    IsInt({message})(target, propertyName)
    Min(1,{message})(target, propertyName)
    Max(100,{message})(target, propertyName)
}
}
