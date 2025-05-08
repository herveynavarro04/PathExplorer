import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseHelperService {
  constructor(private readonly dataSource: DataSource) {}

  async insertMany(
    tableName: string,
    values: Record<string, any>[],
    orIgnore = true,
  ) {
    const query = this.dataSource
      .createQueryBuilder()
      .insert()
      .into(tableName)
      .values(values);

    if (orIgnore) query.orIgnore();

    return query.execute();
  }

  async deleteMany(
    tableName: string,
    conditions: Record<string, any>,
    whereInKey?: string,
    whereInValues?: string[],
  ) {
    const query = this.dataSource
      .createQueryBuilder()
      .delete()
      .from(tableName)
      .where(conditions);

    if (whereInKey && whereInValues?.length) {
      query.andWhere(`${whereInKey} IN (:...ids)`, { ids: whereInValues });
    }

    return query.execute();
  }
}
