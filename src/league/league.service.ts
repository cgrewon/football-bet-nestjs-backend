import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from 'src/match/entities/match.entity';
import { MatchService } from 'src/match/match.service';
import { Repository } from 'typeorm';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { League } from './entities/league.entity';

@Injectable()
export class LeagueService {
  constructor(
    @InjectRepository(League)
    private readonly leagueRepository: Repository<League>,

    private readonly matchService: MatchService,
  ) {}

  async create(createLeagueDto: CreateLeagueDto) {
    const league = new League();
    league.name = createLeagueDto.name;

    const createdOne = await this.leagueRepository.save(league);

    console.log({ createdOne });
    for (let match of createLeagueDto.matches) {
      const one = { ...match, league: createdOne };
      const createdMatch = await this.matchService.create(one);
    }

    return this.findOne(createdOne.id);
  }

  async findAll(skip: number = 0, limit: number = 100) {
    console.log({skip, limit})
    const [data, count] = await this.leagueRepository
      .createQueryBuilder('league')
      .leftJoinAndSelect('league.matches', 'matches')
      .skip(skip)
      .limit(limit)
      .getManyAndCount();

      return {
        data, count
      }
  }

  async findOne(id: number) {
  
    const league = await this.leagueRepository.findOne({
      where:{
        id: id
      },
      relations:['matches', 'tickets', 'tickets.pickTeams', 'tickets.pickTeams.match']
    })

    return league;
  }

  async update(id: number, updateLeagueDto: UpdateLeagueDto) {
    let league = await this.leagueRepository
      .createQueryBuilder('league')
      .leftJoinAndSelect('league.matches', 'matches')
      .where('league.id = :id', { id: id })
      .getOneOrFail();

    league.name = updateLeagueDto.name;
    await this.leagueRepository.save(league);

    await this.matchService.removeByLeagueId(league.id);

    for (let one of updateLeagueDto.matches) {
      const match = { ...one, league: league };
      await this.matchService.create(match);
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    const res = await this.leagueRepository
      .createQueryBuilder('league')
      .where('league.id = :id', { id: id })
      .delete()
      .execute();
    console.log(res);
    return res;
  }
}
