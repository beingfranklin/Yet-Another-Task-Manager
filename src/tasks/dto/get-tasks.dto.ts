import { IsOptional } from 'class-validator';
import { TaskStatus } from '../tasks.model';

export class GetTaskFilterDto {
  @IsOptional()
  status?: TaskStatus;
  @IsOptional()
  search?: string;
}
