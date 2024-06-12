import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { KudoService } from '../services/kudo.service';
import { SendKudoDto } from '../dto/send-kudo.dto';
import { JwtEmployeeGuard } from '../../auth/guard/jwt-employee.guard';

@Controller('kudos')
export class KudosController {
  constructor(private kudoService: KudoService) {}

  @UseGuards(JwtAuthGuard)
  @Post('send-kudo')
  async sendKudo(@Body() body: SendKudoDto, @Request() req) {
    body.from = req.user?.employee?.email || body.from;
    const kudo = await this.kudoService.sendKudo(body);

    return { kudo };
  }

  @UseGuards(JwtEmployeeGuard)
  @Get('my-kudo')
  async getMyKudo(@Request() req) {
    const employeeId = req.user.employee.id;
    const kudos = await this.kudoService.getAllEmployeeKudos(employeeId);

    return { kudos };
  }
}
