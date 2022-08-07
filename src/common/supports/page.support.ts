import * as _ from 'lodash';

export class PageSupport<T> {
  totalCount: number;
  totalPage: number;
  list: T[];
  page: number;
  pageSize: number;

  constructor(totalCount: number, list: T[], page: number, pageSize: number) {
    this.totalCount = totalCount;
    this.totalPage = _.ceil(totalCount / pageSize);
    this.list = list;
    this.page = page;
    this.pageSize = pageSize;
  }
}
