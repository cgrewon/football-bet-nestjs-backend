import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PickTeamService } from './pick_team.service';
import { CreatePickTeamDto } from './dto/create-pick_team.dto';
import { UpdatePickTeamDto } from './dto/update-pick_team.dto';

@Controller('pick-team')
export class PickTeamController {
  constructor(private readonly pickTeamService: PickTeamService) {}

  @Post()
  create(@Body() createPickTeamDto: CreatePickTeamDto) {
    return this.pickTeamService.create(createPickTeamDto);
  }

  @Get()
  findAll() {
    return this.pickTeamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pickTeamService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePickTeamDto: UpdatePickTeamDto) {
    return this.pickTeamService.update(+id, updatePickTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pickTeamService.remove(+id);
  }
}
