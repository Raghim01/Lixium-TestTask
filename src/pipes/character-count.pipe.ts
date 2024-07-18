import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  Type,
} from '@nestjs/common';

@Injectable()
export class ValidateCharactersPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    if (value && value.content !== undefined) {
      const contentLength = value.content.trim().length;

      if (contentLength === 0 || contentLength > 160) {
        throw new BadRequestException(
          'Tweet content must be between 1 and 160 characters long',
        );
      }
    }

    return value;
  }

  private toValidate(metatype: Type<any>): boolean {
    const types: Array<Type<any>> = [Array, Object];

    return !types.includes(metatype);
  }
}
