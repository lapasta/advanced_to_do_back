import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { PagingDto } from 'src/common/dto/paging.dto';
import { UserStatusEnum } from 'src/common/enums/user-status.enum';

export class SearchUserDto {
  @ApiProperty({ example: 'test1@example.com', description: '이메일' })
  email?: string | null;

  @ApiProperty({ description: '제공업체' })
  @IsOptional()
  @IsEnum(UserStatusEnum)
  provider?: UserStatusEnum | null;

  @ApiProperty({ description: '소셜 아이디' })
  socialId?: string | null;

  @ApiProperty({ description: '이름' })
  name?: string | null;

  @ApiProperty({ description: '회원상태' })
  @IsOptional()
  @IsEnum(UserStatusEnum)
  status?: UserStatusEnum | null;
}

// TODO 생성자를 이용한 default값 확인 필요
export class SearchUserPagingDto extends IntersectionType(
  SearchUserDto,
  PagingDto,
) {}
