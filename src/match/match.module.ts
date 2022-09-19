import { forwardRef, Global, Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { PickTeamModule } from 'src/pick_team/pick_team.module';

@Global()
@Module({
  imports:[TypeOrmModule.forFeature([Match]), forwardRef(()=>PickTeamModule) ],
  controllers: [MatchController],
  providers: [MatchService],
  exports:[MatchService]
})
export class MatchModule {}
