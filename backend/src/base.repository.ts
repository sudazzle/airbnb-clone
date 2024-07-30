import { getRepositoryToken, getDataSourceToken } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { DataSource, Repository } from 'typeorm';

export interface ExtendedRepository<T> extends Repository<T> {
  findOneByIdOrFail: (id: string) => Promise<T>
}

export const getExtendedRepository = (entity: EntityClassOrSchema) => {
  return {
    provide: getRepositoryToken(entity),
    inject: [getDataSourceToken()],
    useFactory(datasource: DataSource) {
      return datasource.getRepository(entity).extend({
        findOneByIdOrFail(id: string) {
          const whereCondition = { id };
          return this.findOneByOrFail(whereCondition);
        }
      });
    },
  }
} 
