import { Test, TestingModule } from '@nestjs/testing';
import { PickTeamController } from './pick_team.controller';
import { PickTeamService } from './pick_team.service';

describe('PickTeamController', () => {
  let controller: PickTeamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PickTeamController],
      providers: [PickTeamService],
    }).compile();

    controller = module.get<PickTeamController>(PickTeamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
