import { Test, TestingModule } from '@nestjs/testing';
import { PickTeamService } from './pick_team.service';

describe('PickTeamService', () => {
  let service: PickTeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PickTeamService],
    }).compile();

    service = module.get<PickTeamService>(PickTeamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
