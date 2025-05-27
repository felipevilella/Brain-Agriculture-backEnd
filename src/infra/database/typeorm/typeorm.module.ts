import { Module } from "@nestjs/common";
import { TypeOrmModule, type TypeOrmModuleOptions } from "@nestjs/typeorm";

import { EnvironmentConfigModule } from "../config/environment-config.module";
import { EnvironmentConfigService } from "../config/environment-config.service";

const isCI = process.env.CI === "true" || process.env.GITHUB_ACTIONS === "true";

export const getTypeOrmModuleOptions = (
  config: EnvironmentConfigService
): TypeOrmModuleOptions =>
  ({
    type: "postgres",
    url: config.getDatabaseUrl(),
    autoLoadEntities: true,
    synchronize: isCI ? true : false,
    migrationsRun: isCI ? false : true,
    entities: [__dirname + "/entities/**/*.entity{.ts,.js}"],
    migrations: [__dirname + "/migrations/*.{ts,js}"],
  }) as TypeOrmModuleOptions;

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}
