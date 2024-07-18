import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTweetDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Content should not be empty' })
  content: string;
}
