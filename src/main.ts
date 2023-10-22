import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: '*',
    });

    app.use(express.static('.'));

    const config = new DocumentBuilder()
        .setTitle('This is swagger')
        .addBearerAuth()
        .build();
    const comment = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api', app, comment);

    const port = 8080;
    await app.listen(port, () => {});
}
bootstrap();
