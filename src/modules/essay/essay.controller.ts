import { CreateEssayDto } from '@app/modules/essay/dto/create-essay.dto';
import {
  ESSAY_SERVICE,
  IEssayService,
} from '@app/modules/essay/interfaces/essay.service.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { GetEssayDto } from './dto/get-essay.dto';
import { UpdateEssayDto } from './dto/update-essay.dto';

@Controller('essay')
export class EssayController {
  @Inject(ESSAY_SERVICE)
  private readonly essayService: IEssayService;

  @Post()
  async create(@Body() createEssaytDto: CreateEssayDto) {
    return this.essayService.createEssay(createEssaytDto);
  }

  @Delete(':essayId')
  async deleteEssay(@Param('essayId') essayId: number) {
    return this.essayService.deletEssay(essayId);
  }

  @Patch(':essayId')
  async updateEssay(
    @Param('essayId') essayId: number,
    @Body() updateEssayDto: UpdateEssayDto,
  ) {
    return this.essayService.updateEssay(essayId, updateEssayDto);
  }

  @Get('unreviewed-essays')
  async getUnreviewedEssay(@Query() getEssayDto: GetEssayDto) {
    return this.essayService.getUnreviewedEssay({
      page: getEssayDto.page,
      itemPerPage: getEssayDto.itemPerPage,
    });
  }

  @Get('user-essay/:userId')
  async getUserEssay(@Param('userId') userId: number) {
    return this.getUserEssay(userId);
  }

  @Get('get-essay/:essayId')
  async getEssayById(@Param('essayId') essayId: number) {
    return this.essayService.getEssaybyId(essayId);
  }
}
