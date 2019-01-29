import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCatDto {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsNumber()
  @IsOptional()
  readonly age: number;

  @IsString()
  @IsOptional()
  readonly breed: string;
}
