import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
  Validate,
} from 'class-validator';
import { PublicFile } from 'src/entities/public-file.entity';
import { UserProvidersEnum } from 'src/common/enums/user-providers.enum';
import { UserStatusEnum } from 'src/common/enums/user-status.enum';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { toInt } from 'src/utils/helpers/cast.helper';

// TODO anotation 순서 체크 필요
export class UpdateUserDto {
  @ApiProperty({ description: '아이디' })
  @Transform(({ value }) => toInt(value))
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: 'test1@example.com', description: '이메일' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @Validate(IsExist, ['User'], {
    message: 'emailExists',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // TODO 비밀번호 정규식 validate 처리
  // 관련 정규식: "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
  @ApiProperty({ description: '비밀번호' })
  @IsOptional()
  @MinLength(8)
  password?: string;

  @ApiProperty({ description: '제공업체' })
  @IsOptional()
  @IsEnum(UserProvidersEnum)
  provider?: UserProvidersEnum;

  @ApiProperty({ description: '소셜 아이디' })
  socialId?: string | null;

  @ApiProperty({ description: '이름' })
  name?: string | null;

  @ApiProperty({ description: '회원상태' })
  @IsOptional()
  @IsEnum(UserStatusEnum)
  status: UserStatusEnum;

  @ApiProperty({ description: '사진' })
  @IsOptional()
  @Validate(IsExist, ['PublicFile', 'id'], {
    message: 'imageNotExists',
  })
  photo?: PublicFile | null;
}
