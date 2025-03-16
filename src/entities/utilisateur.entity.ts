// utilisateur.entity.ts
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UtilisateurRole } from '../types/utilisateur';
import { Maison } from './maison.entity';

@Entity()
export class Utilisateur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UtilisateurRole,
    default: UtilisateurRole.LOCATAIRE,
  })
  role: string;

  @OneToMany('Maison', 'proprietaire')
  maisons: Maison[];
}