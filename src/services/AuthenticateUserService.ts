import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs"
import {sign} from "jsonwebtoken"
import { UsersRepositories } from "../repositories/UsersRepositories"


interface AuthenticateRequest {
    email: string,
    password: string
}


class AuthenticateUserService{
    async execute({email, password}: AuthenticateRequest){
        const usersRepositories = getCustomRepository(UsersRepositories)

        const user = await usersRepositories.findOne({
            email
        })

        if(!user){
            throw new Error("Email or password incorrect")
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Email or password incorrect")
        }

        const token = sign({
            email: user.email
        }, "f084a9751bcf08ceb2a68eda5c48eb37",{
            subject: user.id,
            expiresIn: "1d"
        })

        return token
    }

}

export {AuthenticateUserService}