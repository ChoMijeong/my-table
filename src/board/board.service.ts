import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './board.schema';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private repo: Repository<Board>,
  ) {}

  async findAll(page: number = 1) {
    const take = 10;
    const skip = (page - 1) * take;

    const [boards, total] = await this.repo.findAndCount({
      order: { id: 'DESC' },
      take,
      skip,
    });

    return {
      boards,
      total,
      page,
      lastPage: Math.ceil(total / take),
    };
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  create(data: CreateBoardDto) {
    const board = this.repo.create(data);
    return this.repo.save(board);
  }
}
