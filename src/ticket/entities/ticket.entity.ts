import { League } from "src/league/entities/league.entity";
import { PickTeam } from "src/pick_team/entities/pick_team.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    user_name: string;
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne((type)=>League, league=>league.tickets, {onDelete: 'CASCADE'})
    league: League;

    @OneToMany(type=>PickTeam, pickteam=>pickteam.ticket)
    pickTeams: [PickTeam];

}
