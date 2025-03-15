import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { UtilisateurController } from './utilisateur.controller';
import { UtilisateurService } from './utilisateur.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateur } from '../entities/utilisateur.entity';

@Module({
  controllers: [UtilisateurController],
  imports: [TypeOrmModule.forFeature([Utilisateur])],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
    UtilisateurService,
  ],
})
export class UtilisateurModule {}
