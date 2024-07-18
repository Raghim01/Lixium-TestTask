import { Tweet } from 'src/tweets/entities/tweet.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ name: 'tweet_id' })
  tweetId: string;

  @ManyToOne(() => Tweet, (tweet) => tweet.comments)
  @JoinColumn({ name: 'tweet_id' })
  tweet: Tweet;

  @Column({ name: 'content', type: 'text', nullable: false })
  content: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: string;
}
