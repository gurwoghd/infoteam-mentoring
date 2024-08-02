import { IsOptional, IsString } from 'class-validator';

export class SearchPostQueryDto {
  @IsString()
  @IsOptional()
  name?: string;
}
