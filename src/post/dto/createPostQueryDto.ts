import { IsString } from 'class-validator';

export class CreatePostQueryDto {
  @IsString()
  content: string;
}
