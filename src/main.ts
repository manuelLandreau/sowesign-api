import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
// require('dotenv').config()

const port = process.env.PORT || 3000;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(port);
}
bootstrap();
