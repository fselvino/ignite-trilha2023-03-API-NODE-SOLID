import { UsersRepository } from "@/repositories/users-repository";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resouce-not-found-error";

interface GetUserProfileUseCaseRequest {
  userId:string
  //password:string
}
interface GetUserProfileUseCaseReply {
  user: User
}



export class GetUserProfileUseCase {
  constructor(
    private userRepository: UsersRepository
  ) { }

  async execute({ userId}: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseReply> {
    // buscar o usuario perlo usuario
    // comparar se a senha no banco bate com a senaha repassado pelo usuario

    const user = await this.userRepository.findyById(userId)
    //se não exitir o usuario retorna erro de credencial
    if (!user) {
      throw new ResourceNotFoundError()
    }
    return {
      user
    }

  }
}  