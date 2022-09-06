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

import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "./product.entity";
import { ProductsService } from "./products.service";
import { UpdateProductDto } from "./dto/update-product.dto";

@ApiTags("Products")
@ApiHeader({
  name: "x-tenant-id",
  description: "Tenant ID",
})
@Controller("products")
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: "Create product" })
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all product" })
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get("/:id")
  @ApiOperation({ summary: "Get product by id" })
  findOne(@Param("id", ParseUUIDPipe) id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Update product using id" })
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Delete product by id" })
  deleteOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.productService.delete(id);
  }
}
