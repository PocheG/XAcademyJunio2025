import "reflect-metadata"
import { Type } from "class-transformer";
import { IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, isString, IsString, Length, Max, Min, } from "class-validator";

export class UpdatePlayerValidations{
    @IsString()
    @Length(3, 100, { message: 'El nombre completo debe tener entre 1 y 100 caracteres' })
    longName:string='';

    @IsString()
    @IsNotEmpty({ message: 'El parametro team no puede ser un string vacio' })
    team?:string

    @IsString()
    @IsNotEmpty({ message: 'El parametro positions no puede ser un string vacio' })
    positions:string=''

    @Type(() => Number)
    @IsIn([15,16,17,18,19,20,21,22,23])
    fifaVersion:number=0;

    @IsString()
    @IsNotEmpty({ message: 'El parametro playerFaceUrl no puede ser un string vacio' })
    playerFaceUrl?:string

    @IsNumber()
    @Min(1)
    @Max(5)
    reputation: number=0

    @IsNumber()
    @Min(18)
    @Max(40)
    age:number=0

    @IsNumber()
    @Min(100)
    @Max(230)
    heightCm:number=0
  
    @IsNumber()
    weightKg:number=0

    @IsString()
    @IsNotEmpty({ message: 'El parametro nationality no puede ser un string vacio' })
    nationality:string=''

    @IsString()
    @IsNotEmpty({ message: 'El parametro preferredFoot no puede ser un string vacio' })
    preferredFoot:string=''

    @IsString()
    @IsNotEmpty({ message: 'El parametro bodyType no puede ser un string vacio' })
    bodyType:string=''

    @IsString()
    @IsNotEmpty({ message: 'El parametro traits no puede ser un string vacio' })
    tratis:string=''
    
    @Type(() => Number) 
    @isStatParam()
    pace:number=0
    @Type(() => Number) 
    @isStatParam()
    shooting:number=0
    @Type(() => Number) 
    @isStatParam()
    passing:number=0
    @Type(() => Number) 
    @isStatParam()
    dribbling:number=0
    @Type(() => Number) 
    @isStatParam()
    physic:number=0
    
    @Type(() => Number) 
    @isStatParam()
    defending:number=0

    @Type(() => Number) 
    @isStatParam()
    attackingCrossing:number=0
    @Type(() => Number) 
    @isStatParam() 
    attackingFinishing:number=0
    @Type(() => Number) 
    @isStatParam()
    attackingHeadingAccuracy:number=0
    @Type(() => Number) 
    @isStatParam()
    attackingShortPassing:number=0
    @Type(() => Number) 
    @isStatParam()
    attackingVolleys:number=0
}

function isStatParam(){
  
  return function isOptionalNumericParam(target:any, propertyName:string) {
    const message= `${propertyName} debe ser un número entre 1 y 100`
    IsInt({message})(target, propertyName)
    Min(1,{message})(target, propertyName)
    Max(100,{message})(target, propertyName)
}
}
