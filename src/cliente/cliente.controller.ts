import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/registrare-cliente.dto';
import { loginClienteDto } from './dto/login-cliente.dto';
import { Public } from './decorators/public.decorators';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Public()
  @Post('registraCliente')
  async registraClienteController(@Body() registraCliente: CreateClienteDto) {
    try {
      const success: boolean =
        await this.clienteService.registraCliente(registraCliente);
      if (success) return 'Cliente registrato!';
      else throw new Error('Cliente non creato...');
    } catch (error) {
      console.log(error);
      throw new Error('errore inserimento dati');
    }
  }
  @Public()
  @Post('login')
  async loginController(@Body() loginDTO: loginClienteDto) {
    try {
      const jwtV = await this.clienteService.loginCliente(loginDTO);
      return jwtV;
    } catch (error) {
      console.log(error);
      throw new Error('errore inserimento dati');
    }
  }
  @Get(':codiceCliente')
  async restituisciController(@Param('codiceCliente') codiceCliente: string) {
    try {
      return await this.clienteService.findOne(codiceCliente);
    } catch (error) {
      console.log(error);
      throw new Error('errore inserimento dati');
    }
  }
}
