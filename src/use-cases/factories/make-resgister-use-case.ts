import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { RegisterUseCase } from "../register"

export function makeRegisterUseCase(){
  const usersRepository = new PrismaUsersRepository
  const registerUseCase = new RegisterUseCase(usersRepository)//port inversão de dependencia repasso as dependicas do repositorio para o caso de uso

  return registerUseCase
}