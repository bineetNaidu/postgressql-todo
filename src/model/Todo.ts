import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  task: string;

  @Column()
  completed: boolean;

  constructor(id: number, task: string, completed: boolean) {
    this.id = id;
    this.task = task;
    this.completed = completed;
  }
}
