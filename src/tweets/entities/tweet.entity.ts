import { Exclude } from 'class-transformer';
import { Comment } from 'src/comments/entities/comment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tweet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'content', type: 'text', nullable: false })
  content: string;

  @Exclude()
  @Column({ name: 'is_archived', type: 'boolean', default: false })
  isArchived: boolean;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: string;

  @OneToMany(() => Comment, (comment) => comment.tweet)
  comments: Comment[];
}
