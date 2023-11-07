import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('AutoRia clone API')
  .addBearerAuth()
  .build();
