import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TenantsModule } from "./modules/public/tenants/tenants.module";
import { TenancyModule } from "./modules/tenancy/tenancy.module";
import { ProductsModule } from "./modules/tenanted/products/products.module";
import { UsersModule } from "./modules/tenanted/users/users.module";
import { GetHeaderMiddleware } from "./middlewares/getHeader.middleware";
import { TenantsService } from "./modules/public/tenants/tenants.service";
import * as ormconfig from "./orm.config";
import { Tenant } from "./modules/public/tenants/tenant.entity";
import { CategoriesModule } from "./modules/tenanted/categories/categories.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([Tenant]),
    TenantsModule,
    TenancyModule,
    ProductsModule,
    UsersModule,
    CategoriesModule,
  ],

  providers: [TenantsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GetHeaderMiddleware)
      .exclude(
        {
          path: "tenants",
          method: RequestMethod.GET,
        },
        {
          path: "tenants",
          method: RequestMethod.POST,
        }
      )
      .forRoutes("*");
  }
}
