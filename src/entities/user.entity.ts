import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { EntityHelper } from 'src/utils/entity-helper';
import { UserProvidersEnum } from 'src/enums/user-providers.enum';
import { UserStatusEnum } from 'src/enums/user-status.enum';
import { PublicFile } from './public-file.entity';
import { IsEnum } from 'class-validator';

@Entity()
export class User extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, comment: '이메일' })
  email?: string | null;

  @Column({ nullable: true, comment: '비밀번호' })
  password?: string | null;

  public previousPassword: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  @Index()
  @Column({ default: UserProvidersEnum.email, comment: '제공업체' })
  @IsEnum(UserProvidersEnum)
  provider: UserProvidersEnum;

  @Index()
  @Column({ name: 'social_id', default: '', comment: '소셜 아이디' })
  socialId: string;

  @Column({ nullable: true, comment: '이름' })
  name?: string | null;

  @Index()
  @Column({ default: UserStatusEnum.active, comment: '회원상태' })
  @IsEnum(UserStatusEnum)
  status: UserStatusEnum;

  @OneToOne(() => PublicFile, (photo) => photo.user)
  @JoinColumn({ name: 'photo_id' })
  photo?: PublicFile | null;

  @RelationId((user: User) => user.photo)
  photo_id: number;
}
