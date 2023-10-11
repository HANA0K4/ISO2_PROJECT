import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 } from 'uuid';
import Boom from '@hapi/boom';
import { BUCKET_NAME } from '../commons/constants.mjs';
import { MINIO_ACCESS_KEY, MINIO_SECRET_KEY, MINIO_HOST } from '../commons/env.mjs';

class MinioService {
  conn = null;

  constructor() {
    if (!this.conn) {
      this.conn = new S3Client({
        region: 'us-east-1',
        credentials: {
          accessKeyId: MINIO_ACCESS_KEY,
          secretAccessKey: MINIO_SECRET_KEY,
        },
        endpoint: MINIO_HOST,
        forcePathStyle: true,
      });
    }
  }

  async saveImage(image) {
    try {
      if (!image) {
        throw Boom.badData('image is required');
      }
      if (!image.originalname) {
        throw Boom.badData('image.originalname is required');
      }
      if (!image.buffer) {
        throw Boom.badData('image.buffer is required');
      }
      const { originalname, buffer } = image;
      const originalNameParts = originalname.split('.');

      if (originalNameParts.length !== 2) {
        throw Boom.badData('image.originalname is invalid');
      }
      const extension = originalNameParts[1];
      const fileName = `${v4()}.${extension}`;

      await this.conn.send(new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: buffer,
      }));
      return fileName;
    } catch (error) {
      throw Boom.isBoom(error) ? error : Boom.internal('Error saving image', error);
    }
  }
}

export default MinioService;
