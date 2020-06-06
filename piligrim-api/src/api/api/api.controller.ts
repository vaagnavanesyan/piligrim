import { Controller, Get, Param, Query } from '@nestjs/common';
import { ParserService } from '../../site-parser/parser/parser.service';

@Controller('api')
export class ApiController {
  constructor(private readonly parser: ParserService) {}

  @Get('/movies/:id')
  getMovie(@Param('id') id) {
    return this.parser.getMovie(id);
  }

  @Get('/dashboard')
  dashboardPage(@Query('page') page: number = 0) {
    return this.parser.getDashboard(page);
  }
}
