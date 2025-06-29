import { Op } from "sequelize";
import { userModel } from "../../core/models/UserModel";

export class UserRepository{


    static async getUser (userName:string,password:string):Promise<boolean> {
      const where:any={
        userName: { [Op.eq]: userName },
        password: { [Op.eq]: password }
      }
  
      const user = await userModel.findOne({
        where,
      });
  
      return user?true:false
  };}