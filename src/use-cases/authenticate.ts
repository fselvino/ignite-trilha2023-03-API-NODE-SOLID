import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialError } from "./errors/invalid-credentis-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}
interface AuthenticateUseCaseReply {
  user: User
}



export class AuthenticateUseCase {
  constructor(
    private userRepository: UsersRepository
  ) { }

  async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseReply> {
    // buscar o usuario no banco pelo email
    // comparar se a senha no banco bate com a senaha repassado pelo usuario

    const user = await this.userRepository.findyByEmail(email)
    //se não exitir o usuario retorna erro de credencial
    if (!user) {
      throw new InvalidCredentialError()
    }

    //Boolean => is, has, does
    const doesPasswordMatches = await compare(password, user.password_hash )

    if(!doesPasswordMatches){
      throw new InvalidCredentialError()
    }

    return {
      user
    }

  }
}  