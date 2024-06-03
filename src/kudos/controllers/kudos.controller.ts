import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { KudoService } from '../services/kudo.service';
import { SendKudoDto } from '../dto/send-kudo.dto';

@Controller('kudos')
export class KudosController {
  constructor(private kudoService: KudoService) {}

  @UseGuards(JwtAuthGuard)
  @Post('send-kudo')
  async sendKudo(@Body() body: SendKudoDto, @Request() req) {
    body.from = body.from || req.user.employee.id;
    const kudo = await this.kudoService.sendKudo(body);

    return { kudo };
  }
}
