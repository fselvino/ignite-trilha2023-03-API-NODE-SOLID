import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { AuthenticateUseCase } from "../authenticate"

export function makeAuthenticateUseCase(){
  const 
  usersRepository = new PrismaUsersRepository
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)//port inversão de dependencia repasso as dependicas do repositorio para o caso de uso

  return authenticateUseCase
}