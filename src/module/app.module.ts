import { Module } from "@nestjs/common";

import { EnvironmentConfigModule } from "../infra/database/config/environment-config.module";
import { TypeOrmConfigModule } from "../infra/database/typeorm/typeorm.module";
import { UseCaseProxyModule } from "../infra/usecase-proxy/usecase-proxy.module";

@Module({
  imports: [
    UseCaseProxyModule.register(),
    EnvironmentConfigModule,
    TypeOrmConfigModule,
  ],
  controllers: [],
})
export class AppModule {}
