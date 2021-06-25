import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface ComplimentRequest{
    tag_id: string;
    user_receiver: string;
    user_sender: string;
    message: string;
}

class CreateComplimentService{
    async execute({tag_id, user_receiver, user_sender, message}: ComplimentRequest){
        const complimentRepository = getCustomRepository(ComplimentsRepositories)
        const usersRepository = getCustomRepository(UsersRepositories)

        if(user_sender === user_receiver){
            throw new Error("You can not send praise to yourself.")
        }

        const userReceiverExists = await usersRepository.findOne(user_receiver)

        if(!userReceiverExists){
            throw new Error("User receiver does not exists")
        }



        const compliments = complimentRepository.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        })

        await complimentRepository.save(compliments)

        return compliments

    }
}

export { CreateComplimentService}