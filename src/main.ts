import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { swaggerConfig } from './swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const APP_PORT = configService.get('APP_PORT') || 3000;

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/v1', app, document);
  await app.listen(APP_PORT, () => {
    Logger.log(`Application listening on port ${APP_PORT}`, 'BootstrapApp');
    Logger.log(
      `Documentation available at http://localhost:${APP_PORT}/api/v1`,
      'SwaggerDocumentation',
    );
  });
}

void bootstrap();
