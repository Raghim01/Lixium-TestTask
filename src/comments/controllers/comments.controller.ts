import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':tweetId')
  async createComment(
    @Param('tweetId') tweetId: string,
    @Body() body: CreateCommentDto,
  ) {
    return this.commentsService.createComment(tweetId, body);
  }

  @Get()
  async getAllComments() {
    return this.commentsService.getAllComments();
  }

  @Get(':id')
  async getCommentById(@Param('id') id: string) {
    return this.commentsService.getCommentById(id);
  }

  @Get(':tweetId')
  async getAllCommentsByTweet(@Param('tweetId') tweetId: string) {
    return this.commentsService.getCommentsByTweetId(tweetId);
  }

  @Patch(':id')
  async updateComment(@Param('id') id: string, @Body() body: UpdateCommentDto) {
    return this.commentsService.updateComment(id, body);
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: string) {
    return this.commentsService.deleteComment(id);
  }
}
