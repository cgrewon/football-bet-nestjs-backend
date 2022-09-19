import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MatchService } from 'src/match/match.service';
import { TicketService } from 'src/ticket/ticket.service';
import { Repository } from 'typeorm';
import { CreatePickTeamDto } from './dto/create-pick_team.dto';
import { UpdatePickTeamDto } from './dto/update-pick_team.dto';
import { PickTeam } from './entities/pick_team.entity';

@Injectable()
export class PickTeamService {
  constructor(
    @InjectRepository(PickTeam)
    private readonly pickTeamRepository: Repository<PickTeam>,
    @Inject(forwardRef(()=>MatchService))
    private readonly matchService: MatchService,
    
    @Inject(forwardRef(()=>TicketService))
    private readonly ticketService: TicketService,
  ) {}

  async create(createPickTeamDto: CreatePickTeamDto) {

    const pickTeam = new PickTeam();

    pickTeam.team_index = createPickTeamDto.team_index;
    const match = await  this.matchService.findOne(createPickTeamDto.match_id);
    const ticket = await this.ticketService.findOne(createPickTeamDto.ticket_id);
    
    pickTeam.match = match;
    pickTeam.ticket = ticket;

    return await this.pickTeamRepository.save(pickTeam);
  }

  findAll() {
    return `This action returns all pickTeam`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pickTeam`;
  }

  update(id: number, updatePickTeamDto: UpdatePickTeamDto) {
    return `This action updates a #${id} pickTeam`;
  }

  removeByTicket(id: number) {
    return this.pickTeamRepository.createQueryBuilder()
    .where('ticketId = :id' , {id: id})
    .delete()
    .execute();
  }

  remove(id: number) {
    return this.pickTeamRepository
    .createQueryBuilder()
    .where('id = :id', { id })
    .delete()
    .execute();
  }
}
