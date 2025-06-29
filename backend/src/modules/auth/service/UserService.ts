import { AuthenticationError } from "../../../errors/AuthenticationError"
import { UserRepository } from "../adapters/repository/UserRepository"
import { jwtService } from "./jswService"


export class UserService{
    static async login(userName:string, password:string):Promise<string>{
        const user = await UserRepository.getUser(userName,password)

        if(!user){
            throw new AuthenticationError('No existe un usuario con ese nombre y contraseña')
        }
        else{
            const token= jwtService.sign({user})
            return token
        }
    }
}