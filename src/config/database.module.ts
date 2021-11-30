import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'usersInfo',
        entities: ['dist/**/*.entity.js'],
        synchronize: false,
        migrations: ['dist/migration/*.js'],
        cli: {
          migrationsDir: 'migration',
        },
        factories: __dirname + 'dist/**/database/factories/**/*.js',
        seeds: __dirname + 'dist/**/database/seeds/**/*.js',
      }),
    }),
  ],
  providers: [],
})
export class DatabaseModule {
  constructor() {}
}
