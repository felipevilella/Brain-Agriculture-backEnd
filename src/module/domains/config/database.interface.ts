export interface DatabaseConfig {
  getDatabaseUrl: () => string;
  getDatabaseSchema: () => string;
  getDatabaseSync: () => boolean;
}
