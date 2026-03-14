import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  OpenAPIObject,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { writeFileSync } from 'fs';

import { InternalServerErrorDto } from 'src/common/decorators/internal-server-error.dto';

async function generateAndExit(document: OpenAPIObject, app: INestApplication) {
    const fileName = process.env.OPENAPI_FILE;

    if (!fileName) {
      console.log("env: no filename for swagger.")
    }  else {
      // Bad
      writeFileSync(`./../../../packages/open-api/${fileName}`, JSON.stringify(document, null, 2));
    }

    await app.close();
    process.exit(0);
}

export async function setupSwagger(app: INestApplication): Promise<void> {
  const config = new DocumentBuilder()
    .setTitle('Ant REST API')
    .setDescription('The REST API for Ant Habit Tracker.')
    .setVersion('1.0')
    .addGlobalResponse({
      status: 500,
      description: 'Internal server error',
      type: InternalServerErrorDto,
    })
    .build();

  const options: SwaggerDocumentOptions = {};

  const document = SwaggerModule.createDocument(app, config, options);

  if (process.env.GENERATE_OPENAPI === 'true') await generateAndExit(document, app);

  SwaggerModule.setup('api', app, document);
}
