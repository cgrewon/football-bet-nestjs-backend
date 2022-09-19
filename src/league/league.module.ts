import { Global, Module } from '@nestjs/common';
import { LeagueService } from './league.service';
import { LeagueController } from './league.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { League } from './entities/league.entity';

import { MatchModule } from 'src/match/match.module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([League]), MatchModule],
  controllers: [LeagueController],
  providers: [LeagueService],
  exports: [LeagueService],
})
export class LeagueModule {}
