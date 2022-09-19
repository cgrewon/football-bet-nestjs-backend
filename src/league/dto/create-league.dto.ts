import { IsArray, IsEmpty, IsNotEmpty } from 'class-validator';
import { CreateMatchDto } from 'src/match/dto/create-match.dto';


export class CreateLeagueDto {
  
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  matches: CreateMatchDto[];
}
