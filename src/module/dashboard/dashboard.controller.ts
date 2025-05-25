import {
  Controller,
  Get,
  Inject,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UseCaseProxy } from "src/infra/usecase-proxy/usecase-proxy";
import { DashboardUseCaseProxyModule } from "src/infra/usecase-proxy/dashboard-usecase-proxy.module";
import { DashboardService } from "./services/dashbord.service";

@Controller("dashboard")
export class DashboardController {
  constructor(
    @Inject(DashboardUseCaseProxyModule.DASHBOARD_SERVICE)
    private readonly dashboardService: UseCaseProxy<DashboardService>
  ) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getDashboard() {
    return await this.dashboardService.getInstance().execute();
  }
}
