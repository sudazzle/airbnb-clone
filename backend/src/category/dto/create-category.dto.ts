import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  imageUrl: string;
}

