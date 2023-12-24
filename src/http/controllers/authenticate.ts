import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { AuthenticateUseCase } from "@/use-cases/authenticate"
import { InvalidCredentialError } from "@/use-cases/errors/invalid-credentis-error"

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {

  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password } = authenticateBodySchema.parse(request.body)


  try {

    const usersRepository = new PrismaUsersRepository

    const authenticateUseCase = new AuthenticateUseCase(usersRepository)//port inversão de dependencia repasso as dependicas do repositorio para o caso de uso

    await authenticateUseCase.execute({
      email,
      password
    })
  } catch (err) {

    if (err instanceof InvalidCredentialError) {

      return reply.status(400).send({ message: err.message })
    }
    throw err
  }

  return reply.status(200).send()
}