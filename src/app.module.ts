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
import { DepartamentoPaisModule } from './departamento_pais/departamento_pais.module';
import { MunicipioDepartamentoModule } from './municipio_departamento/municipio_departamento.module';
import { ImagenesPortadasModule } from './imagenes_portadas/imagenes_portadas.module';
import { PostsUsersModule } from './posts_users/posts_users.module';
import { PostsMediaModule } from './posts_media/posts_media.module';
import { LikesPostsModule } from './likes_posts/likes_posts.module';
import { FriendRequestsModule } from './friend_requests/friend_requests.module';

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
    DepartamentoPaisModule,
    MunicipioDepartamentoModule,
    ImagenesPortadasModule,
    PostsUsersModule,
    PostsMediaModule,
    LikesPostsModule,
    FriendRequestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
