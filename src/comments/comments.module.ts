import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CommentsService } from './services/comments.service';
import { CommentsController } from './controllers/comments.controller';
import { Tweet } from 'src/tweets/entities/tweet.entity';
import { TweetsModule } from 'src/tweets/tweets.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Tweet]), TweetsModule],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
