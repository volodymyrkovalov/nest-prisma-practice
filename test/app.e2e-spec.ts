import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from 'src/auth/dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'test@example.com',
      password: '123',
    };

    describe('signup', () => {
      it('Should throw exception if email empty', () => {
        return request(app.getHttpServer())
          .post('/auth/signup')
          .send({
            password: dto.password,
          })
          .expect(400);
      });

      it('Should throw exception if password empty', () => {
        return request(app.getHttpServer())
          .post('/auth/signup')
          .send({
            email: dto.email,
          })
          .expect(400);
      });

      it('Should signup', () => {
        return request(app.getHttpServer())
          .post('/auth/signup')
          .send(dto)
          .expect(201);
      });
    });

    describe('signin', () => {
      it('Should throw exception if email empty', () => {
        return request(app.getHttpServer())
          .post('/auth/signin')
          .send({
            password: dto.password,
          })
          .expect(400);
      });

      it('Should throw exception if password empty', () => {
        return request(app.getHttpServer())
          .post('/auth/signin')
          .send({
            email: dto.email,
          })
          .expect(400);
      });

      it('Should signin', async () => {
        await request(app.getHttpServer()).post('/auth/signup').send(dto);
        return request(app.getHttpServer())
          .post('/auth/signin')
          .send(dto)
          .expect(200);
      });
    });
  });

  describe('User', () => {});

  describe('Orders', () => {});

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });
});
