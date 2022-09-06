import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Connection, Repository } from "typeorm";

import { CONNECTION } from "../../tenancy/tenancy.symbols";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  private readonly usersRepository: Repository<User>;

  constructor(@Inject(CONNECTION) connection: Connection) {
    this.usersRepository = connection.getRepository(User);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.save(createUserDto);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    user.firstName = updateUserDto.email;
    user.lastName = updateUserDto.lastName;
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;

    return await this.usersRepository.save(updateUserDto);
  }

  async delete(id: string) {
    const user = await this.findOne(id);
    return await this.usersRepository.remove(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException(`no user for this id`);
    return user;
  }
}
