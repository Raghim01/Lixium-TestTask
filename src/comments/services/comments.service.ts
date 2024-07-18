import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { TweetsService } from 'src/tweets/services/tweets.service';
import { plainToClass } from 'class-transformer';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { ERROR_MESSAGE } from 'src/common/error-messages';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
    private readonly tweetsService: TweetsService,
  ) {}

  async createComment(
    tweetId: string,
    body: CreateCommentDto,
  ): Promise<Comment> {
    const tweet = await this.tweetsService.getTweetById(tweetId);

    if (!tweet) {
      throw new HttpException(
        ERROR_MESSAGE.tweetNotFound,
        HttpStatus.NOT_FOUND,
      );
    }

    const comment = plainToClass(Comment, { ...body, tweetId });
    return await this.commentsRepository.save(comment);
  }

  async getAllComments(): Promise<Comment[]> {
    return await this.commentsRepository.find();
  }

  async getCommentById(id: string): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({ where: { id } });

    if (!comment) {
      throw new HttpException(
        ERROR_MESSAGE.commentNotFound,
        HttpStatus.NOT_FOUND,
      );
    }

    return comment;
  }

  async getCommentsByTweetId(tweetId: string): Promise<Comment[]> {
    const comments = await this.commentsRepository
      .createQueryBuilder('comment')
      .where('comment.tweet_id = :tweetId', { tweetId })
      .getMany();

    if (!comments) {
      throw new HttpException(
        ERROR_MESSAGE.noCommentForTweet,
        HttpStatus.NOT_FOUND,
      );
    }

    return comments;
  }

  async updateComment(id: string, body: UpdateCommentDto): Promise<Comment> {
    const comment = await this.getCommentById(id);

    comment.content = body.content;
    return await this.commentsRepository.save(comment);
  }

  async deleteComment(id: string) {
    const comment = await this.getCommentById(id);

    if (!comment) {
      throw new HttpException(
        ERROR_MESSAGE.commentNotFound,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.commentsRepository.delete(id);

    return { deleted: true };
  }
}
