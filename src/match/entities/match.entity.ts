import { League } from 'src/league/entities/league.entity';
import { PickTeam } from 'src/pick_team/entities/pick_team.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  match_title: string;

  @Column({ nullable: true })
  date: Date;

  @Column()
  team1: string;

  @Column({type: 'float'})
  team1_score: number;

  @Column()
  team2: string;

  @Column({type: 'float'})
  team2_score: number;

  @Column({type: 'float'})
  draw_score: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(type=>League, league=>league.matches, {onDelete: 'CASCADE'})
  league: League;

  @OneToMany(type=>PickTeam, pickTeam=>pickTeam.match)
  pickTeams: [PickTeam];
  
}
