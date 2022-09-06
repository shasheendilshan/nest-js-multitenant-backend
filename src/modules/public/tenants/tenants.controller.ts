import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { CreateTenantDto } from "./dto/create-tenant.dto";
import { Tenant } from "./tenant.entity";
import { TenantsService } from "./tenants.service";

@ApiTags("Tenants")
@Controller("tenants")
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  @ApiOperation({ summary: "Create tenant" })
  create(@Body() createTenantDto: CreateTenantDto): Promise<Tenant> {
    return this.tenantsService.create(createTenantDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all tenants" })
  findAll(): Promise<Tenant[]> {
    return this.tenantsService.findAll();
  }
}
