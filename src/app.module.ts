import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { PropertyModule } from './property/property.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pgConfig } from './dbConfig';
import { ConfigModule } from '@nestjs/config';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { MaisonModule } from './maison/maison.module';
@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRoot(pgConfig),
    MaisonModule,
    // PropertyModule,
    UtilisateurModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
