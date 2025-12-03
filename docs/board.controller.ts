import { Controller, Get, Post, Body, Param, Render, Res, Query } from '@nestjs/common';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

@Get()
@Render('index')
async list(@Query('page') page: number) {
  page = page ? Number(page) : 1;
  const data = await this.boardService.findAll(page);
  return data; // boards, total, page, lastPage 모두 넘어감
}

  @Get('write')
  @Render('write')
  writePage() {
    return {};
  }

  @Post('write')
  async write(@Body() body, @Res() res) {
    await this.boardService.create(body);
    return res.redirect('/board');
  }

  @Get(':id')
  @Render('detail')
  async detail(@Param('id') id: number) {
    const board = await this.boardService.findOne(id);
    
  if (!board) {
    return { board: null };
  }
    return { board };
  }


}
