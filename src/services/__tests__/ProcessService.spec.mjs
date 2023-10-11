import {
  describe, test, expect, jest,
} from '@jest/globals';
import ProcessService from '../ProcessService.mjs';
import ProcessRepository from '../../repositories/ProcessRepository.mjs';
import MinioService from '../MinioService.mjs';

describe('ProcessService test', () => {
  const processRepository = new ProcessRepository();
  const minioService = new MinioService();
  minioService.saveImage = jest.fn().mockImplementationOnce(() => Promise.resolve('test'));
  const processService = new ProcessService({ processRepository, minioService });

  test('Test Aplyfilter function with invalid payload', () => {
    expect(processService.applyFilters()).rejects.toThrow();
    expect(processService.applyFilters({})).rejects.toThrow();
    expect(processService.applyFilters({ filters: [] })).rejects.toThrow();
  });

  test('Test Aplyfilter function with valid payload', async () => {
    const payload = {
      filters: ['negative'],
      images: [
        {
          originalname: 'imagen.jpg',
          buffer: Buffer.from(''),
        },
      ],
    };
    const expectedProcess = {
      id: '1234',
      filters: payload.filters,
      images: payload.images,
    };
    ProcessRepository.save = jest.fn().mockImplementationOnce(() => expectedProcess);

    minioService.saveImage = jest.fn().mockImplementationOnce(() => Promise.resolve('imagen.jpg'));

    const process = await processService.applyFilters(payload);
    expect(process).toMatchObject(expectedProcess);
  });
});
