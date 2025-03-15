import { Controller, Post, Get, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
// import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { RunTaskDto } from './dto/run-task.dto';
import { TaskStatusResponseDto } from './dto/task-status.dto';

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Start a new crawling task' })
  @ApiResponse({
    status: 201,
    description: 'Returns the task ID that can be used to check the status',
    type: String,
  })
  async runTask(@Body() dto: RunTaskDto): Promise<string> {
    return this.taskService.runTask(dto);
  }

  @Get(':id')
  // @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Get task status and data' })
  @ApiResponse({
    status: 200,
    description: 'Returns the task status and any available data',
    type: TaskStatusResponseDto,
  })
  async getTaskStatus(@Param('id') id: string): Promise<TaskStatusResponseDto> {
    return this.taskService.getTaskStatus(id);
  }

  @Post(':id/stop')
  @ApiOperation({ summary: 'Stop a running task' })
  @ApiResponse({
    status: 200,
    description: 'Stops the running task and returns the updated status',
    type: TaskStatusResponseDto,
  })
  async stopTask(@Param('id') id: string): Promise<TaskStatusResponseDto> {
    return this.taskService.stopTask(id);
  }
}
