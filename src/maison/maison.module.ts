  import { Module } from '@nestjs/common';
  import { MaisonController } from './maison.controller';
  import { MaisonService } from './maison.service';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { Maison } from '../entities/maison.entity';
  import { UtilisateurModule } from '../utilisateur/utilisateur.module';

  @Module({
    imports: [TypeOrmModule.forFeature([Maison]), UtilisateurModule],
    controllers: [MaisonController],
    providers: [MaisonService],
  })
  export class MaisonModule {}
