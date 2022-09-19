import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import Config from './config/Config';
import { LeagueModule } from './league/league.module';
import { MatchModule } from './match/match.module';
import { TicketModule } from './ticket/ticket.module';
import { PickTeamModule } from './pick_team/pick_team.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: Config.DB_TYPE as 'mysql',
      host: Config.DB_HOST,
      port: Config.DB_PORT,
      username: Config.DB_USERNAME,
      password: Config.DB_PASSWORD,
      database: Config.DB_NAME,
      autoLoadEntities: true,
      entities: ['src/**/entities/*.entity{ .ts,.js}'],
      synchronize: true,
    }),
    LeagueModule,
    MatchModule,
    TicketModule,
    PickTeamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
