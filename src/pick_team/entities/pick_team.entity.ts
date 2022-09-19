import { Match } from "src/match/entities/match.entity";
import { Ticket } from "src/ticket/entities/ticket.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PickTeam {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default:-1})
    team_index: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(type=>Match, match=>match.pickTeams, {onDelete: 'CASCADE'})
    match: Match;

    @ManyToOne(type=>Ticket, ticket=>ticket.pickTeams, {onDelete: 'CASCADE'})
    ticket: Ticket;

}
