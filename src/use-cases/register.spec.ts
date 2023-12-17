import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
//import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { compare } from 'bcryptjs'

describe('Register use Case', () => {

  it('should hash user password upon registration', async () => {

    //const prismaUsersRepository = new PrismaUsersRepository()
    //const registerUseCase = new RegisterUseCase(prismaUsersRepository)

    const registerUseCase = new RegisterUseCase({

      async findyByEmail(email) {
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date()
        }

      }
    })

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    })

    //verifica se o hash informado e o mesmo calculado
    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)


    expect(isPasswordCorrectlyHashed).toBe(true)

  })
})