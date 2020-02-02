import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { ApiModule } from './api/api.module';

@Module({
  imports: [
    ApiModule,
    GraphQLModule.forRoot({
      include: [ApiModule],
      autoSchemaFile: 'schema.gql',
    }),
  ],
})
export class AppModule {}
