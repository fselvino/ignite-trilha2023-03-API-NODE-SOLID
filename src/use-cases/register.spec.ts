import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/ in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-alrady-exists'


let usersRepository: InMemoryUserRepository
let sut: RegisterUseCase

describe('Register use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {

    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    })

    //espero que o id retornado seja qualquer string
    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {

    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    })

    //verifica se o hash informado e o mesmo calculado
    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)

  })

  //teste se não será possivel registrar com mesmo e-mail
  it('should not be able to register with same emil twice', async () => {

    const email = 'johndoe@gmail.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456'
    })

    //no segundo cadastro 

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456'
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)

  })
})