import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './property/property.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pgConfig } from 'src/dbConfig';
import { ConfigModule } from '@nestjs/config';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRoot(pgConfig),
    PropertyModule,
    UtilisateurModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
