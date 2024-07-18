import { Module } from '@nestjs/common';
import { TweetsModule } from './tweets/tweets.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as dotenv from 'dotenv';
import { AppDataSource } from 'ormconfig';
import { CommentsModule } from './comments/comments.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    TweetsModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
