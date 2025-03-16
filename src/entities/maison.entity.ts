// maison.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Utilisateur } from './utilisateur.entity';

@Entity()
export class Maison {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  address: string = "";

  @Column()
  city: string = "";

  @Column()
  price: number = 0;

  @Column()
  size: number = 0; // in square meters

  @ManyToOne('Utilisateur', 'maisons', {
    onDelete: 'CASCADE',
  })
  proprietaire: Utilisateur = new Utilisateur();
}