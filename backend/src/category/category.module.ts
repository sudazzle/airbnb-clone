import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ConfigModule } from '@nestjs/config';
import { CategoryController } from './category.controller';
import { TypeOrmModule, getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { DataSource, FindOptionsWhere } from 'typeorm';
import { getExtendedRepository } from 'src/base.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), ConfigModule],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    getExtendedRepository(Category)
  ]
})
export class CategoryModule { }
