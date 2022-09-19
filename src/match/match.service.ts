import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PickTeamService } from 'src/pick_team/pick_team.service';
import { Repository } from 'typeorm';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Match } from './entities/match.entity';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,

    @Inject(forwardRef(()=>PickTeamService))
    private readonly pickteamService: PickTeamService,
  ) {}

  async create(createMatchDto: CreateMatchDto) {
    const match = new Match();
    match.date = createMatchDto.date;
    match.match_title = createMatchDto.match_title;
    match.team1 = createMatchDto.team1;
    match.team1_score = createMatchDto.team1_score;
    match.team2 = createMatchDto.team2;
    match.team2_score = createMatchDto.team2_score;
    match.draw_score = createMatchDto.draw_score;
    if (createMatchDto.league) {
      match.league = createMatchDto.league;
    }

    const one = await this.matchRepository.save(match);
    return one;
  }

  async findAll(skip = 0, limit = 20) {
    const [data, count] = await this.matchRepository
      .createQueryBuilder('match')
      .leftJoinAndSelect('match.league', 'league')
      .skip(skip)
      .limit(limit)
      .getManyAndCount();

    return {
      data,
      count,
    };
  }

  async findOne(id: number) {
    return await this.matchRepository.createQueryBuilder('match')
    .leftJoinAndSelect('match.league', 'league')
    .where('match.id = :id', {id})
    .getOne();
  }

  async update(id: number, updateMatchDto: UpdateMatchDto) {

    const match = await this.matchRepository.findOneByOrFail({id});

    match.match_title =  updateMatchDto.match_title;
    match.date =  updateMatchDto.date;
    match.team1 =  updateMatchDto.team1;
    match.team1_score =  updateMatchDto.team1_score;
    match.team2 =  updateMatchDto.team2;
    match.team2_score =  updateMatchDto.team2_score;
    match.draw_score =  updateMatchDto.draw_score;

    return await this.matchRepository.save(match);
  }

  async removeByLeagueId(leagueId: number) {


    return await this.matchRepository.createQueryBuilder()
    .where('leagueId = :id', {id: leagueId})
    .delete()
    .execute();


  }

  async remove(id: number) {
    return await this.matchRepository.createQueryBuilder('match')
    .where('match.id = :id', {id})
    .delete()
    .execute();
  }
}
