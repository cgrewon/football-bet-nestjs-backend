import { IsDate, IsEmpty, IsNotEmpty, IsNumber,  IsString } from "class-validator";
import { League } from "src/league/entities/league.entity";

export class CreateMatchDto {

  @IsString()
  match_title: string;

  @IsDate()
  date: Date;

  @IsString()
  team1: string;

  @IsNumber()
  team1_score: number;

  @IsString()
  team2: string;

  @IsNumber()
  team2_score: number;

  @IsNumber()
  draw_score: number;

  @IsNotEmpty()
  league?: League;
}
