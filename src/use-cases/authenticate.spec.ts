import { describe, expect, it } from 'vitest'
//import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { hash } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/ in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialError } from './errors/invalid-credentis-error'

describe('Authenticate use Case', () => {

  it('should be able to authenticate', async () => {

    const usersRepository = new InMemoryUserRepository()
    const sut = new AuthenticateUseCase(usersRepository) //sut - system under t

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
      email: 'johndoe@gmail.com',
      password: '123456'
    })
    //espero que o id retornado seja qualquer string
    expect(user.id).toEqual(expect.any(String))

  })

  // Testa se o email foi informado errado
  it('should be able to authenticate with wrong email', async () => {

    const usersRepository = new InMemoryUserRepository()
    const sut = new AuthenticateUseCase(usersRepository) //sut - system under t  

    expect(() => sut.execute({
      email: 'johndoe@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  //Testa se a senha foi informada errada
  it('should be able to authenticate with wrong email', async () => {

    const usersRepository = new InMemoryUserRepository()
    const sut = new AuthenticateUseCase(usersRepository) //sut - system under t  

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6)
    })

    // Informo a senha errada e os testes passam
    expect(() => sut.execute({
      email: 'johndoe@gmail.com',
      password: '123457'
    })).rejects.toBeInstanceOf(InvalidCredentialError)
  })

})   
