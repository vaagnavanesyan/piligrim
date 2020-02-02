import { Module } from '@nestjs/common';
import { ApiController } from './api/api.controller';
import { SiteParserModule } from 'src/site-parser/site-parser.module';
import { FilmsResolver, DashboardResolver } from './resolvers';

@Module({
  controllers: [ApiController],
  imports: [SiteParserModule],
  providers: [FilmsResolver, DashboardResolver],
})
export class ApiModule {}
