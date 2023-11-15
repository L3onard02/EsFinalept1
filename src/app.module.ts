import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProdottoModule } from './prodotto/prodotto.module';

@Module({
  imports: [
    ClienteModule,
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      // entities: ['**/*.entity{.ts,.js}'],
      autoLoadEntities: true, //risolve automaticamente i percorsi delle entities
      synchronize: true, //crea automaticamente lo schema(tabelle)
      migrationsTableName: 'migration',
      migrations: ['src/migration/*.ts'],
    }),
    ProdottoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
