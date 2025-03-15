import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}
  transform(value: any, metadata: ArgumentMetadata) {
    const parseValide = this.schema.safeParse(value);
    if (parseValide.success) {
      return parseValide.data;
    }
    throw new BadRequestException(parseValide.error.format());
  }
}
