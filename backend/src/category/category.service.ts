import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ExtendedRepository } from 'src/base.repository';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: ExtendedRepository<Category>,
    private readonly configService: ConfigService
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const storage = new Storage();
    await storage.bucket(this.configService.get('GCP_STORAGE_BUCKET_NAME')).upload('/Users/sudaman/Desktop/Screenshot 2024-07-04 at 20.40.56.png', {
      public: true
    });
    return 'file is uploaded';
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: string) {
    return this.repository.findOneByIdOrFail(id);
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: string) {
    return `This action removes a #${id} category`;
  }
}
