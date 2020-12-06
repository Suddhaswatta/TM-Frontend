import { Task } from './task';

export class TaskObject implements Task {
    id: number;
    start: Date;
    deadline: Date;
    assignTo: string;
    description: string;
    title: string;
    status: string;

    constructor(id,start,deadline,assignTo,description,title,status){
        this.id = id;
        this.start = start;
        this.deadline = deadline;
        this.assignTo = assignTo;
        this.description = description;
        this.title = title;
        this.status = status;
        this.id = id;
    }
    
}
