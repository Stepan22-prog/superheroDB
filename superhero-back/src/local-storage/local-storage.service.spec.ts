import { Test, TestingModule } from '@nestjs/testing';
import { LocalStorageService } from './local-storage.service';
import { ConfigService } from '@nestjs/config';
import { promises as fs } from 'fs';
import { join } from 'path';

jest.mock('fs', () => ({
  promises: {
    mkdir: jest.fn(),
    writeFile: jest.fn(),
    unlink: jest.fn(),
  },
}));

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let configService: ConfigService;

  const mockConfigService = {
    get: jest.fn().mockReturnValue('http://localhost:3000/'),
  };

  const mockFile = {
    buffer: Buffer.from('test content'),
    originalname: 'test-file.jpg',
  } as Express.Multer.File;

  const filename = 'test-file.jpg';
  const uploadDir = join(__dirname, '..', '..', 'uploads');
  const filePath = join(uploadDir, filename);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStorageService,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<LocalStorageService>(LocalStorageService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get', () => {
    it('should return the correct file URL', () => {
      const result = service.get(filename);
      expect(result).toBe('http://localhost:3000/' + filename);
      expect(configService.get).toHaveBeenCalledWith(
        'SERVER_URL',
        'http://localhost:3000',
        { infer: true },
      );
    });
  });

  describe('upload', () => {
    it('should create directory and save file', async () => {
      await service.upload(filename, mockFile);

      expect(fs.mkdir).toHaveBeenCalledWith(uploadDir, { recursive: true });
      expect(fs.writeFile).toHaveBeenCalledWith(filePath, mockFile.buffer);
    });
  });

  describe('delete', () => {
    it('should delete the specified file', async () => {
      await service.delete(filename);

      expect(fs.unlink).toHaveBeenCalledWith(filePath);
    });

    it('should throw an error if file does not exist', async () => {
      (fs.unlink as jest.Mock).mockRejectedValueOnce(
        new Error('File not found'),
      );

      await expect(service.delete(filename)).rejects.toThrow('File not found');
      expect(fs.unlink).toHaveBeenCalledWith(filePath);
    });
  });
});
