import { Controller, Get, Post, Body, Param, Render, Res, Query } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardSchema } from './board.schema';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get()
  @Render('index')
  async list(@Query('page') page: number) {
    page = page ? Number(page) : 1;
    const data = await this.boardService.findAll(page);
    return data;
  }

  @Get('write')
  @Render('write')
  writePage() {
    return {};
  }

  @Post('write')
  async write(@Body() body: any, @Res() res: any) {
    try {
      // ✅ 여기서 검증 + 정리된 값 받기
      const data = CreateBoardSchema.parse(body);

      await this.boardService.create(data);
      return res.redirect('/board');
    } catch (e: any) {
      // ✅ 검증 실패 시 다시 write 페이지로
      // (간단 버전: 콘솔 확인 + 리다이렉트)
      console.log(e?.errors ?? e);
      return res.redirect('/board/write');
    }
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