import { IsString, IsOptional, IsObject } from 'class-validator';
import { ProxyConfig } from '../../crawler/types';

export class RunTaskDto {
  @IsString()
  url: string;

  @IsString()
  websiteType: string;

  @IsOptional()
  @IsObject()
  proxy?: ProxyConfig;
}
