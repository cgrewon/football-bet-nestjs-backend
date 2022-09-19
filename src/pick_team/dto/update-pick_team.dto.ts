import { PartialType } from '@nestjs/mapped-types';
import { CreatePickTeamDto } from './create-pick_team.dto';

export class UpdatePickTeamDto extends PartialType(CreatePickTeamDto) {}
