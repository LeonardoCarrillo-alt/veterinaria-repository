import { Module } from '@nestjs/common';
import { ProductsController } from './presentation/products.controller';
import { CreateProductUseCase } from './application/use-cases/create-product.use-case';
import { GetProductsUseCase } from './application/use-cases/get-products.use-case';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController],
  providers: [CreateProductUseCase, GetProductsUseCase],
})
export class ProductsModule {}
