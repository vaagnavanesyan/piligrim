import { Module } from '@nestjs/common';
import { ApiController } from './api/api.controller';
import { SiteParserModule } from '../site-parser/site-parser.module';
import { MovieResolver, DashboardResolver } from './resolvers';

@Module({
  controllers: [ApiController],
  imports: [SiteParserModule],
  providers: [MovieResolver, DashboardResolver],
})
export class ApiModule {}
