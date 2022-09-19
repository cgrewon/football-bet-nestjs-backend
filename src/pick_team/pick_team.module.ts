import { forwardRef, Global, Module } from '@nestjs/common';
import { PickTeamService } from './pick_team.service';
import { PickTeamController } from './pick_team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PickTeam } from './entities/pick_team.entity';

import { MatchModule } from 'src/match/match.module';
import { TicketService } from 'src/ticket/ticket.service';
import { TicketModule } from 'src/ticket/ticket.module';


@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([PickTeam]), 
    forwardRef(()=> TicketModule),
    forwardRef(()=> MatchModule)
  ],
  controllers: [PickTeamController],
  providers: [PickTeamService, ],
  exports:[PickTeamService]
})
export class PickTeamModule {}
