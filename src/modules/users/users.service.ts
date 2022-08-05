import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/common/types/entity-condition.type';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PageSupport } from 'src/common/supports/page.support';
import { Repository } from 'typeorm';
import { SearchUserPagingDto } from './dto/search-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepo.save(this.userRepo.create(createUserDto));
  }

  findOne(fields: EntityCondition<User>) {
    return this.userRepo.findOne({
      where: fields,
    });
  }

  // async findManyWithPagination(
  //   fields: EntityCondition<User>,
  //   pagingDto: PagingDto,
  // ) {
  //   const totalCount = await this.userRepo.count();
  //   const list = await this.userRepo.find({
  //     where: fields,
  //     order: {
  //       [pagingDto.orderField]: pagingDto.orderBy,
  //     },
  //     skip: (pagingDto.page - 1) * pagingDto.pageSize,
  //     take: pagingDto.pageSize,
  //   });

  //   return new PageSupport<User>(
  //     totalCount,
  //     list,
  //     pagingDto.page,
  //     pagingDto.pageSize,
  //   );
  // }

  async findSearchPage(searchPagingDto: SearchUserPagingDto) {
    const qb = this.userRepo
      .createQueryBuilder()
      .from(User, 'user')
      .where('1=1');

    if (searchPagingDto.email) {
      qb.andWhere('user.email like :email', {
        email: `%${searchPagingDto.email}%`,
      });
    }

    if (searchPagingDto.provider) {
      qb.andWhere('user.provider like :provider', {
        provider: `%${searchPagingDto.provider}%`,
      });
    }

    if (searchPagingDto.socialId) {
      qb.andWhere('user.socialId like :socialId', {
        socialId: `%${searchPagingDto.socialId}%`,
      });
    }

    if (searchPagingDto.name) {
      qb.andWhere('user.name like :name', {
        name: `%${searchPagingDto.name}%`,
      });
    }

    if (searchPagingDto.status) {
      qb.andWhere('user.status like :status', {
        status: `%${searchPagingDto.status}%`,
      });
    }

    qb.offset((searchPagingDto.page - 1) * searchPagingDto.pageSize).limit(
      searchPagingDto.pageSize,
    );

    const result = await qb
      .disableEscaping() // escape character disable
      .getManyAndCount(); // 조회 및 총 개수 반환

    return new PageSupport<User>(
      result[1], // totalCount
      result[0], // list
      searchPagingDto.page,
      searchPagingDto.pageSize,
    );
  }

  update(updateUserDto: UpdateUserDto) {
    return this.userRepo.save(this.userRepo.create(updateUserDto));
  }
}
