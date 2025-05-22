import { Injectable, BadRequestException } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class ImageService {
  readonly allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
  readonly maxFileSize = 200 * 1024;
  readonly maxWidth = 500;
  readonly maxHeight = 500;

  validateMimeType(file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file provided');
    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Only JPEG, PNG, or WebP images are allowed',
      );
    }
  }

  async compressImage(buffer: Buffer): Promise<Buffer> {
    let quality = 80;
    let compressedBuffer: Buffer;

    do {
      compressedBuffer = await sharp(buffer)
        .resize(this.maxWidth, this.maxHeight, { fit: 'inside' })
        .jpeg({ quality })
        .toBuffer();

      quality -= 10;
    } while (compressedBuffer.length > this.maxFileSize && quality > 20);

    if (compressedBuffer.length > this.maxFileSize) {
      throw new BadRequestException('Unable to compress image below 200 KB');
    }

    return compressedBuffer;
  }
}
