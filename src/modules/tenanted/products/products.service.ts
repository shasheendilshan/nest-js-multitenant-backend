import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Connection, Repository } from "typeorm";

import { CONNECTION } from "../../tenancy/tenancy.symbols";
import { Product } from "./product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsService {
  private readonly productsRepository: Repository<Product>;

  constructor(@Inject(CONNECTION) connection: Connection) {
    this.productsRepository = connection.getRepository(Product);
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsRepository.save(createProductDto);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);

    product.name = updateProductDto.name;
    product.price = updateProductDto.price;
    product.description = updateProductDto.description;
    product.image = updateProductDto.image;
    product.category = updateProductDto.category;

    return await this.productsRepository.save(product);
  }

  async delete(id: string) {
    const product = await this.findOne(id);
    return await this.productsRepository.remove(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find();
  }

  async findOne(id: string) {
    const product = await this.productsRepository.findOne(id);
    if (!product) throw new NotFoundException(`no product for this id`);
    return product;
  }
}
