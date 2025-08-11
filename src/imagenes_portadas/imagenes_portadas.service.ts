import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImagenesPortada } from './entities/imagenes_portada.entity';
import { User } from 'src/auth/entities/auth.entity';
import { Repository } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImagenesPortadasService {
  constructor(
    @InjectRepository(ImagenesPortada)
    private readonly profileImageRepo: Repository<ImagenesPortada>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}
  async uploadProfileImage(
    userId: string,
    file: Express.Multer.File,
  ): Promise<ImagenesPortada> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const uploadDir = path.join(
      __dirname,
      '..',
      '..',
      'uploads',
      'images_portada',
    );
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileExt = path.extname(file.originalname);
    const fileName = `${uuidv4()}${fileExt}`;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, file.buffer);

    const baseUrl = process.env.APP_URL;
    const fileUrl = `${baseUrl}/uploads/images_portada/${fileName}`;

    const profileImage = this.profileImageRepo.create({
      url: fileUrl,
      key: fileName,
      mimeType: file.mimetype,
      user,
    });

    return this.profileImageRepo.save(profileImage);
  }

  async getCurrentPortadaImage(
    userId: string,
  ): Promise<ImagenesPortada | null> {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['portadaImages'],
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user.currentPortadaImage;
  }

  async getImagesByUser(userId: string): Promise<ImagenesPortada[]> {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.portadaImages', 'portadaImages')
      .where('user.id = :userId', { userId })
      .orderBy('portadaImages.createdAt', 'DESC')
      .getOne();

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user.portadaImages;
  }

  async deleteProfileImage(imageId: string): Promise<void> {
    const image = await this.profileImageRepo.findOne({
      where: { id: imageId },
    });
    if (!image) {
      throw new NotFoundException('Imagen no encontrada');
    }

    const filePath = path.join(
      __dirname,
      '..',
      '..',
      'uploads',
      'images_portada',
      image.key,
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await this.profileImageRepo.delete(imageId);
  }
}
