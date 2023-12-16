
import { Prisma, User } from "@prisma/client"

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findyByEmail(email: string): Promise<User | null>
}