import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
  async findyByEmail(email: string) {

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    return user

  }

  async  findyById(id: string){
      const user = await prisma.user.findUnique({
        where: {
          id
        }
      })
      return user
  }
  

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data
    })

    return user
  }
}