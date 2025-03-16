// maison.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Utilisateur } from './utilisateur.entity';

@Entity()
export class Maison {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  price: number;

  @Column()
  size: number; // in square meters

  @ManyToOne('Utilisateur', 'maisons', {
    onDelete: 'CASCADE',
  })
  proprietaire: Utilisateur;
}