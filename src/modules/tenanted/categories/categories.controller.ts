import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  ParseUUIDPipe,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiHeader } from "@nestjs/swagger";

import { CreateCategoryDto } from "./dto/create-category.dto";
import { CategoriesService } from "./categories.service";
import { Category } from "./category.entity";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@ApiTags("Categories")
@ApiHeader({
  name: "x-tenant-id",
  description: "Tenant ID",
})
@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: "Create category" })
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all categories" })
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get("/:id")
  @ApiOperation({ summary: "Get category by id" })
  findOne(@Param("id", ParseUUIDPipe) id: string): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Update category using id" })
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Delete category by id" })
  deleteOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.categoriesService.delete(id);
  }
}
