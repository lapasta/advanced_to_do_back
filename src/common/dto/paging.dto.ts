import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber } from 'class-validator';
import { toInt } from 'src/utils/helpers/cast.helper';
import { OrderByEnum } from '../enums/order-by.enum';

export class PagingDto {
  @ApiProperty({ description: '페이지' })
  @Transform(({ value }) => toInt(value, { default: 1 }))
  @IsNumber()
  page: number;

  @ApiProperty({ description: '페이지 크기' })
  @Transform(({ value }) => toInt(value, { default: 10 }))
  @IsNumber()
  pageSize: number;

  @ApiProperty({ description: '정렬 필드' })
  orderField?: string | null;

  @ApiProperty({ description: '정렬(ASC/DESC)' })
  @Transform(({ value }) =>
    value === OrderByEnum.DESC ? OrderByEnum.DESC : OrderByEnum.ASC,
  )
  @IsEnum(OrderByEnum)
  orderBy: string;
}
