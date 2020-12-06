import { Task } from './task';
import { Role } from './role';
export class User {
  constructor(
      public id: string,
      public username: string,
      public firstname: string,
      public lastname: string,
      public roles: Role[],
      public tasks: Task
  ){}

}
