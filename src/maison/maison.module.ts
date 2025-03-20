import { Module } from '@nestjs/common';
import { MaisonController } from './maison.controller';
import { MaisonService } from './maison.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Maison } from '../entities/maison.entity';
import { UtilisateurModule } from '../utilisateur/utilisateur.module';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    TypeOrmModule.forFeature([Maison]),
    UtilisateurModule,
    NestjsFormDataModule.config({ isGlobal: true }),
  ],
  controllers: [MaisonController],
  providers: [MaisonService],
  exports: [TypeOrmModule.forFeature([Maison])],
})
export class MaisonModule {}
