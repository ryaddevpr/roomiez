import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from '../entities/property.entity';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { UpdatePropertyDto } from './dto/updateProperty.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property) private propertyRepo: Repository<Property>,
  ) {}

  async findAll() {
    const properties = await this.propertyRepo.find();

    return properties;
  }

  async findOne(id: number) {
    const property = await this.propertyRepo.findOne({
      where: { id },
    });
    if (!property) {
      throw new NotFoundException('property not found');
    }

    return property;
  }

  async create(dto: CreatePropertyDto) {
    return await this.propertyRepo.save(dto);
  }

  async update(id: number, dto: UpdatePropertyDto) {
    const updatedProperty = await this.propertyRepo.update({ id }, dto);

    return updatedProperty;
  }

  async delete(id: number) {
    const deletedProperty = await this.propertyRepo.delete({ id });

    return deletedProperty;
  } 
}
