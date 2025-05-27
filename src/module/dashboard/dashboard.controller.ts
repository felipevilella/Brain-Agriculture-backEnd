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
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
@ApiTags("Dashboard")
@Controller("dashboard")
export class DashboardController {
  constructor(
    @Inject(DashboardUseCaseProxyModule.DASHBOARD_SERVICE)
    private readonly dashboardService: UseCaseProxy<DashboardService>
  ) {}

  @Get()
  @ApiOperation({ summary: "List information's dashboard" })
  @ApiResponse({
    status: 200,
    description: "Information dashboard listed successfully.",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error.",
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getDashboard() {
    return await this.dashboardService.getInstance().execute();
  }
}
