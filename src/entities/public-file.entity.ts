import { EntityHelper } from 'src/utils/helpers/entity.helper';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class PublicFile extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'original_name', comment: '파일 원본명' })
  originalName: string;

  @Column({ name: 'save_name', comment: '저장 파일 명' })
  saveName: string;

  @Column({ comment: '파일 인코딩' })
  encoding: string;

  @Column({ name: 'mime_type', comment: '마임타입' })
  mimeType: string;

  @Column({ type: 'int', comment: '파일 사이즈' })
  size: number;

  @Column({ type: 'text', comment: '파일 경로 / 파일 URL' })
  path: string;

  @OneToOne(() => User, (user) => user.photo)
  user?: Promise<User> | null;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
