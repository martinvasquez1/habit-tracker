import { PipeTransform, Injectable, BadRequestException, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';

@Injectable()
export class MultiFileValidationPipe implements PipeTransform {
  constructor(
    private readonly validators: (MaxFileSizeValidator | FileTypeValidator)[],
  ) { }

  transform(files: { [key: string]: Express.Multer.File[] }) {
    if (!files || typeof files !== 'object') return files;

    for (const [field, fileArray] of Object.entries(files)) {
      if (!fileArray) continue;

      for (const file of fileArray) {
        for (const validator of this.validators) {
          if (validator instanceof MaxFileSizeValidator) {
            if (!validator.isValid(file)) throw new BadRequestException(`${field} exceeds max size`);
          } else if (validator instanceof FileTypeValidator) {
            if (!validator.isValid(file)) throw new BadRequestException(`${field} must be PNG or JPEG`);
          }
        }
      }
    }
    return files;
  }
}