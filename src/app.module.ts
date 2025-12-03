import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';

@Module({
imports: [
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '5465',
    database: 'my_table',
    autoLoadEntities: true,
    synchronize: true,
  }),
    BoardModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
