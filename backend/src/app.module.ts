import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category/entities/category.entity';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CategoryModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5436,
      username: 'airbnb',
      password: 'airbnb',
      database: 'airbnb',
      synchronize: true,
      entities: [Category],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
