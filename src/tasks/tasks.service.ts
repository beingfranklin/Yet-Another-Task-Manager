import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { GetTaskFilterDto } from './dto/get-tasks.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
    const { status, search }: { status?: string; search?: string } = filterDto;
    return this.tasks.filter((task) => {
      task.status === status ||
        task.description.includes(search) ||
        task.title.includes(search);
    });
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => {
      task.id === id;
    });
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  createTask(CreateTaskDto): Task {
    const {
      title,
      description,
      status,
    }: { title: string; description: string; status?: TaskStatus } =
      CreateTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: status ?? TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;

    return task;
  }
}
