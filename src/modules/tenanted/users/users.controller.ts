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
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";

@ApiTags("Users")
@ApiHeader({
  name: "x-tenant-id",
  description: "Tenant ID",
})
@Controller("users")
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: "Create user" })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all users" })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get("/:id")
  @ApiOperation({ summary: "Get user by id" })
  findOne(@Param("id", ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Update user using id" })
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Delete user by id" })
  deleteOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.usersService.delete(id);
  }
}
