import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { PropertyModule } from './property/property.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pgConfig } from './dbConfig';
import { ConfigModule } from '@nestjs/config';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { MaisonModule } from './maison/maison.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRoot(pgConfig),
    // PropertyModule,
    UtilisateurModule,
    MaisonModule,
    NestjsFormDataModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
