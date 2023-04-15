import { User } from '@prisma/client';

export interface CreateUserDto extends Pick<User, 'iin' | 'firstName' | 'lastName' | 'middleName' | 'phone'> {}
