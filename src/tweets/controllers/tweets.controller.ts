import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { TweetsService } from '../services/tweets.service';
import { CreateTweetDto } from '../dto/create-tweet.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateTweetDto } from '../dto/update-tweet.dto';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('tweets')
@Controller('tweets')
export class TweetsController {
  constructor(private tweetsService: TweetsService) {}

  @Post()
  async createTweet(@Body() body: CreateTweetDto) {
    return await this.tweetsService.createTweet(body);
  }

  @Get()
  async getAllTweets() {
    return await this.tweetsService.getAllTweets();
  }

  @Get(':id')
  async getTweetById(@Param('id') id: string) {
    return await this.tweetsService.getTweetById(id);
  }

  @Patch(':id')
  async updateTweet(@Param('id') id: string, @Body() body: UpdateTweetDto) {
    return await this.tweetsService.updateTweet(id, body);
  }

  @Patch('/restore/:id')
  async restoreTweet(@Param('id') id: string) {
    return await this.tweetsService.restoreTweet(id);
  }

  @Delete(':id')
  async deleteTweet(@Param('id') id: string) {
    return await this.tweetsService.deleteTweet(id);
  }
}
