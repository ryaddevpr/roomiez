import { UtilisateurRole } from 'src/types/utilisateur';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
    unique: true,
  })
  role: string;
}
