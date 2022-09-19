import { forwardRef, Global, Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { PickTeamModule } from 'src/pick_team/pick_team.module';
import { LeagueModule } from 'src/league/league.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    forwardRef(() => PickTeamModule),    
    forwardRef(() => LeagueModule),    
  ],
  controllers: [TicketController],
  providers: [TicketService],
  exports: [TicketService],
})
export class TicketModule {}
