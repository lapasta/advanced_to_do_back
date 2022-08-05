import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderByEnum } from 'src/common/enums/order-by.enum';
import { Like } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUserPagingDto } from './dto/search-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() query: SearchUserPagingDto) {
    if (!query.orderField) {
      query.orderField = 'id';
      query.orderBy = OrderByEnum.ASC;
    }

    return this.usersService.findSearchPage(query);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }
}
