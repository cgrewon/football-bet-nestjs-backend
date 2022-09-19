import { Match } from "src/match/entities/match.entity";
import { Ticket } from "src/ticket/entities/ticket.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class League {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;


    @OneToMany(type=>Ticket, ticket=>ticket.league)
    tickets: [Ticket];

    
    @OneToMany(type=>Match, match=>match.league)
    matches: [Match];

    
}
