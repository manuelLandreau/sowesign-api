import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
// require('dotenv').config();

const port = process.env.PORT || 3000;

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(port);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
