import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LeagueService } from 'src/league/league.service';

import { CreatePickTeamDto } from 'src/pick_team/dto/create-pick_team.dto';
import { PickTeamService } from 'src/pick_team/pick_team.service';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @Inject(forwardRef(() => PickTeamService))
    private readonly pickTeamService: PickTeamService,
    @Inject(forwardRef(() => LeagueService))
    private readonly leagueService: LeagueService
    
  ) {}

  async create(createTicketDto: CreateTicketDto) {
    const newTicket = new Ticket();

    newTicket.user_name = createTicketDto.user_name;
    const league = await this.leagueService.findOne(createTicketDto.league_id);
    newTicket.league = league;
    const savedTicket = await this.ticketRepository.save(newTicket);

    for (let pick of createTicketDto.pickTeams) {
      let _pick: CreatePickTeamDto = {
        ...pick,
        ticket_id: savedTicket.id,
        match_id: pick.match_id,
      };
      await this.pickTeamService.create(_pick);
    }

    return this.findOne(savedTicket.id);
  }

  findAll(props: {leagueId: number}) {

    if (props.leagueId !== undefined) {
      return this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.pickTeams', 'pickTeams')
      .leftJoinAndSelect('ticket.league', 'league')
      .leftJoinAndSelect('league.matches', 'matches')
      .leftJoinAndSelect('pickTeams.match', 'match')
      .where('league.id = :leagueId', { leagueId: props.leagueId })
      .getOne();
    }
    return `This action returns all ticket`;
  }

  findOne(id: number) {
    return this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.pickTeams', 'pickTeams')
      .leftJoinAndSelect('ticket.league', 'league')      
      .leftJoinAndSelect('pickTeams.match', 'match')
      .leftJoinAndSelect('league.matches', 'matches')      
      
      .where('ticket.id = :id', { id })
      .getOne();
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    const ticket = await this.findOne(id);

    ticket.user_name = updateTicketDto.user_name;
    await this.ticketRepository.save(ticket);


    this.pickTeamService.removeByTicket(id);

    for (let pick of updateTicketDto.pickTeams) {
      let _pick: CreatePickTeamDto = {
        ...pick,
        ticket_id: ticket.id,
        match_id: pick.match_id,
      };
      await this.pickTeamService.create(_pick);
    }

    return this.findOne(id);
  }

  async remove(id: number) {

    const ticket = await this.findOne(id);
    
    for(let one of ticket.pickTeams) {
      await this.pickTeamService.remove(one.id);
    }   
    

    return this.ticketRepository
      .createQueryBuilder()
      .where('id = :id', { id })
      .delete()
      .execute();
  }
}
