import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { type DatabaseConfig } from "src/module/domains/config/database.interface";

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig {
  constructor(private readonly configService: ConfigService) {}

  private getOrThrow<T>(key: string): T {
    const value = this.configService.get<T>(key);
    if (value === undefined || value === null) {
      throw new Error(`Configuration key "${key}" is not defined`);
    }
    return value;
  }

  getDatabaseUrl(): string {
    return this.getOrThrow<string>("DATABASE_URL");
  }

  getDatabaseSchema(): string {
    return this.getOrThrow<string>("DATABASE_SCHEMA");
  }

  getDatabaseSync(): boolean {
    return this.getOrThrow<boolean>("DATABASE_SYNCHRONIZE");
  }
}
