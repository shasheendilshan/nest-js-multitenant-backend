import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Connection, Repository } from "typeorm";

import { CONNECTION } from "../../tenancy/tenancy.symbols";
import { Category } from "./category.entity";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoriesService {
  private readonly categoriesRepository: Repository<Category>;

  constructor(@Inject(CONNECTION) connection: Connection) {
    this.categoriesRepository = connection.getRepository(Category);
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoriesRepository.save(createCategoryDto);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    category.name = updateCategoryDto.name;
    return await this.categoriesRepository.save(category);
  }

  async delete(id: string) {
    const category = await this.findOne(id);
    return await this.categoriesRepository.remove(category);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoriesRepository.find();
  }

  async findOne(id: string) {
    const category = await this.categoriesRepository.findOne(id);
    if (!category) throw new NotFoundException(`no category for this id`);
    return category;
  }
}
