import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(CreateTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description, status } = CreateTaskDto;
    const task = this.create({
      title,
      description,
      status: status ?? TaskStatus.OPEN,
    });
    await this.save(task);
    return task;
  }
}
