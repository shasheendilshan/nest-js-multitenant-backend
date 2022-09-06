import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { TenantsService } from "./../modules/public/tenants/tenants.service";

export const TENANT_HEADER = "x-tenant-id";

@Injectable()
export class GetHeaderMiddleware implements NestMiddleware {
  constructor(private readonly tenantService: TenantsService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const header = req.headers[TENANT_HEADER] as string;
    req.tenantId = header?.toString() || null;

    const validTenant = await this.tenantService.findOne(req.tenantId);
    if (!validTenant) throw new UnauthorizedException("Invalid tenant");

    next();
  }
}
