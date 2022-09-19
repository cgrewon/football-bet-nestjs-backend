import { IsArray, IsNotEmpty, IsNumber } from "class-validator";
import { CreatePickTeamDto } from "src/pick_team/dto/create-pick_team.dto";

export class CreateTicketDto {

    @IsNotEmpty()
    @IsNumber()
    league_id: number;

    @IsNotEmpty()
    user_name: string;

    @IsNotEmpty()
    @IsArray()
    pickTeams: CreatePickTeamDto[];
}
