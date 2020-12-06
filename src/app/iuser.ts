import { Task } from './task';
import { Irole } from './irole';
export interface IUSER {

   id: string;
   username: string;
   firstname: string;
   lastname: string;
   roles: Irole[];
   tasks: Task;

}
