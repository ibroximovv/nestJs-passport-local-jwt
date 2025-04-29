import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService){}
  async create(createProductDto: CreateProductDto) {
    try {
      return await this.prisma.product.create({ data: createProductDto });
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message || 'Internal server error')
    }
  }

  async findAll() {
    try {
      return await this.prisma.product.findMany();
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message || 'Internal server error')
    }
  }

  async findOne(id: number) {
    try {
      const one = await this.prisma.product.findFirst({ where: { id }})
      if (!one) {
        throw new BadRequestException('Product not found')
      }
      return one;
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message || 'Internal server error')
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const one = await this.prisma.product.findFirst({ where: { id }})
      if (!one) {
        throw new BadRequestException('Product not found')
      }
      return await this.prisma.product.update({ where: { id }, data: updateProductDto });
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message || 'Internal server error')
    }
  }

  async remove(id: number) {
    try {
      const one = await this.prisma.product.findFirst({ where: { id }})
      if (!one) {
        throw new BadRequestException('Product not found')
      }
      return await this.prisma.product.delete({ where: { id } });
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message || 'Internal server error')
    }
  }
}
