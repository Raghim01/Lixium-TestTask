import { Module } from '@nestjs/common';
import { TweetsService } from './services/tweets.service';
import { TweetsController } from './controllers/tweets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './entities/tweet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet])],
  controllers: [TweetsController],
  providers: [TweetsService],
  exports: [TweetsService],
})
export class TweetsModule {}
