import { IsNotEmpty, IsNumber } from "class-validator";


export class CreatePickTeamDto {

    @IsNotEmpty()
    @IsNumber()
    team_index: number;

    @IsNotEmpty()
    @IsNumber()
    match_id: number;
    
    
    ticket_id: number;

}
