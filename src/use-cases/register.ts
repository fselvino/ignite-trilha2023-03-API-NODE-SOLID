import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-alrady-exists"


/**
 * Principio dos SOLID
 * - ( Dependency Inversion Principle ) - principio da inversão de dependencia.
 * 
 * 
 *   
 */

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {

  //contrutor que receber o repository
  constructor(private useRepository: PrismaUsersRepository) {

  }

  async execute({ name, email, password }: RegisterUseCaseRequest) {

    const password_hash = await hashd(password, 6)

    const userWithSameEmail = await this.useRepository.findyByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    await this.useRepository.create({
      name,
      email,
      password_hash
    })
  }
}