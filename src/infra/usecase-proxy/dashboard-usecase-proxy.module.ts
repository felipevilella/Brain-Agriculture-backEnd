import { DynamicModule,Module } from "@nestjs/common";
import { RepositoriesModule } from "src/infra/repositories/repositories.module";

import { FarmsRepository } from "../repositories/farms.repository";
import { UseCaseProxy } from "./usecase-proxy";
import { CropRepository } from "../repositories/crop.repository";
import { DashboardService } from "src/module/dashboard/services/dashbord.service";

@Module({
  imports: [RepositoriesModule],
})
export class DashboardUseCaseProxyModule {
  static DASHBOARD_SERVICE = "DashboardService";

  static register(): DynamicModule {
    return {
      module: DashboardUseCaseProxyModule,
      providers: [
        {
          inject: [FarmsRepository, CropRepository],
          provide: DashboardUseCaseProxyModule.DASHBOARD_SERVICE,
          useFactory: (farmsRepository: FarmsRepository, CropRepository: CropRepository) =>
            new UseCaseProxy(
              new DashboardService(farmsRepository, CropRepository),
            ),
        },
      ],
      exports: [
        DashboardUseCaseProxyModule.DASHBOARD_SERVICE
      ],
    };
  }
}
