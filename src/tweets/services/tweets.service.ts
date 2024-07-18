import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from '../entities/tweet.entity';
import { Repository } from 'typeorm';
import { CreateTweetDto } from '../dto/create-tweet.dto';
import { plainToClass } from 'class-transformer';
import { UpdateTweetDto } from '../dto/update-tweet.dto';
import { ERROR_MESSAGE } from 'src/common/error-messages';

@Injectable()
export class TweetsService {
  constructor(
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
  ) {}

  async createTweet(body: CreateTweetDto) {
    const newTweet = plainToClass(Tweet, body);

    return await this.tweetRepository.save(newTweet);
  }

  async getAllTweets(): Promise<Tweet[]> {
    return await this.tweetRepository.find();
  }

  async getTweetById(id: string): Promise<Tweet> {
    const tweet = await this.tweetRepository.findOne({
      where: { id: id },
    });

    if (!tweet) {
      throw new HttpException(
        ERROR_MESSAGE.tweetNotFound,
        HttpStatus.NOT_FOUND,
      );
    }

    return tweet;
  }

  async updateTweet(id: string, body: UpdateTweetDto) {
    const tweet = await this.getTweetById(id);

    if (!tweet) {
      throw new HttpException(
        ERROR_MESSAGE.tweetNotFound,
        HttpStatus.NOT_FOUND,
      );
    }

    tweet.content = body.content;
    return await this.tweetRepository.save(tweet);
  }

  async restoreTweet(id: string): Promise<Tweet> {
    const tweet = await this.getTweetById(id);

    if (!tweet) {
      throw new HttpException(
        ERROR_MESSAGE.tweetNotFound,
        HttpStatus.NOT_FOUND,
      );
    }

    tweet.isArchived = false;
    return await this.tweetRepository.save(tweet);
  }

  async deleteTweet(id: string) {
    const tweet = await this.getTweetById(id);

    if (!tweet) {
      throw new HttpException(
        ERROR_MESSAGE.tweetNotFound,
        HttpStatus.NOT_FOUND,
      );
    }

    tweet.isArchived = true;
    await this.tweetRepository.save(tweet);

    return { archived: true };
  }
}
