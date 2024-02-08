import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/ in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profiles'
import { ResourceNotFoundError } from './errors/resouce-not-found-error'

let usersRepository: InMemoryUserRepository
let sut: GetUserProfileUseCase

describe('Get User Profile use Case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new GetUserProfileUseCase(usersRepository) //sut - system under t
  })

  it('should be able to get user profile', async () => {

    const usersRepository = new InMemoryUserRepository()
    const sut = new GetUserProfileUseCase(usersRepository) //sut - system under t

   const createdUser =  await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
      userId: createdUser.id
    })
    //espero que o nome do usuario
  
    expect(user.name).toEqual('John Doe')

  })

  // Testa se o email foi informado errado
  it('should be able to get user profile with wrong id', async () => {
    expect(() => 
    sut.execute({
      userId:'non-existing-id'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

})   
