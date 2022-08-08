import { IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.model';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsNotEmpty()
  status?: TaskStatus;
}
