import { IsOptional, IsString } from 'class-validator';

export class CatQueryDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly breed?: string;
}
