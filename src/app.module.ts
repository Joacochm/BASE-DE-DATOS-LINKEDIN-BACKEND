import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProfileImagesModule } from './profile_images/profile_images.module';
import { join } from 'path';
import { UserInfoModule } from './user_info/user_info.module';
import { UserExperienciaModule } from './user_experiencia/user_experiencia.module';
import { UserEducacionModule } from './user_educacion/user_educacion.module';
import { PaisModule } from './pais/pais.module';
import { SeedModule } from './seed/seed.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: 'localhost',
      port: 1521,
      username: 'SYSTEM',
      password: 'carlos1999.',
      database: 'DBLINKEDIN',
      sid: 'XE',
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    ProfileImagesModule,
    UserInfoModule,
    UserExperienciaModule,
    UserEducacionModule,
    PaisModule,
    SeedModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
