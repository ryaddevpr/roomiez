import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Maison } from '../entities/maison.entity';
import { Repository } from 'typeorm';
import { CreateMaisonDto } from './dto/CreateMaison.dto';
import { UpdateMaisonDto } from './dto/updateMaison.dto';
import { Utilisateur } from '../entities/utilisateur.entity';
import { UtilisateurRole } from '../types/utilisateur';
import { readFile } from 'fs/promises';
@Injectable()
export class MaisonService {
  constructor(
    @InjectRepository(Maison) private maisonRepo: Repository<Maison>,
    @InjectRepository(Utilisateur)
    private utilisateurRepo: Repository<Utilisateur>,
  ) {}

  async findAll() {
    const maisons = await this.maisonRepo.find();
    return maisons;
  }

  async findOne(id: number) {
    const maison = await this.maisonRepo.findOne({ where: { id } });

    if (!maison) {
      throw new NotFoundException('Maison not found');
    }
    const proprietaire = await this.utilisateurRepo.findOne({
      where: { id: maison.proprietaireId },
    });

    const maisonWithProprietaire = {
      ...maison,
      proprietaire,
    };

    return maisonWithProprietaire;
  }

  async create(createMaisonDto: CreateMaisonDto): Promise<Maison> {
    const maison = new Maison();
    maison.address = createMaisonDto.address;
    maison.city = createMaisonDto.city;
    maison.price = createMaisonDto.price;
    maison.size = createMaisonDto.size;
    if (createMaisonDto.proprietaire) {
      maison.proprietaireId = createMaisonDto.proprietaire;
    }

    // Handle image conversion to base64 if an image was uploaded
    if (createMaisonDto.image) {
      // Access the buffer directly from the MemoryStoredFile
      const buffer = createMaisonDto.image.buffer;
      const mimeType = createMaisonDto.image?.busBoyMimeType || 'image/jpeg';
      const base64Image = `data:${mimeType};base64,${buffer.toString('base64')}`;

      // Store the base64 string in the database
      maison.image = base64Image;
    }

    return this.maisonRepo.save(maison);
  }
  async update(id: number, updateMaisonDto: UpdateMaisonDto): Promise<Maison> {
    const maison = await this.maisonRepo.findOneBy({ id });

    if (!maison) {
      throw new Error(`Maison with ID ${id} not found`);
    }

    // Update the basic properties
    if (updateMaisonDto.address) maison.address = updateMaisonDto.address;
    if (updateMaisonDto.city) maison.city = updateMaisonDto.city;
    if (updateMaisonDto.price) maison.price = updateMaisonDto.price;
    if (updateMaisonDto.size) maison.size = updateMaisonDto.size;
    if (updateMaisonDto.proprietaire)
      maison.proprietaireId = updateMaisonDto.proprietaire;

    // Handle image update if provided
    if (updateMaisonDto.image) {
      
      const buffer = updateMaisonDto.image.buffer;

      

      const mimeType = updateMaisonDto.image?.busBoyMimeType || 'image/jpeg';
      const base64Image = `data:${mimeType};base64,${buffer.toString('base64')}`;

      maison.image = base64Image;
    }

    return this.maisonRepo.save(maison);
  }

  async delete(id: number) {
    const result = await this.maisonRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Maison not found');
    }
  }
}
