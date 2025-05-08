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

  async selectMany(
    tableName: string,
    conditions: Record<string, any> = {},
    whereInKey?: string,
    whereInValues?: string[],
    selectColumns?: string[],
  ) {
    const query = this.dataSource
      .createQueryBuilder()
      .select(
        selectColumns?.length
          ? selectColumns.map((col) => `${tableName}.${col}`)
          : undefined,
      )
      .from(tableName, tableName);

    Object.entries(conditions).forEach(([key, value]) => {
      query.andWhere(`${tableName}.${key} = :${key}`, { [key]: value });
    });

    if (whereInKey && whereInValues?.length) {
      query.andWhere(`${tableName}.${whereInKey} IN (:...ids)`, {
        ids: whereInValues,
      });
    }

    return query.getRawMany();
  }
}
