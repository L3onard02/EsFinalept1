import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateClienteDto } from './dto/registrare-cliente.dto';
import { loginClienteDto } from './dto/login-cliente.dto';
import { Cliente } from './entities/cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RestituisciCliente } from './dto/restituire-cliente.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private ClienteRepo: Repository<Cliente>,
    private jwtService: JwtService,
  ) {}

  async registraCliente(createClienteDto: CreateClienteDto): Promise<boolean> {
    try {
      var oggi = new Date();
      const existOrNot: boolean = await this.ClienteRepo.exist({
        where: { CodiceCliente: createClienteDto.CodiceCliente },
      });
      if (!existOrNot) {
        if (new Date(createClienteDto.DataDiNascita) < oggi) {
          await this.ClienteRepo.save(createClienteDto);
          return true;
        } else {
          throw new Error(
            'Data Nascita maggiore alla data odierna!' + new Date(),
          );
        }
      } else throw new Error('il codice cliente già esite' + new Date());
    } catch (error) {
      console.log(error);
      throw new Error('errore');
    }
  }

  async loginCliente(loginDTO: loginClienteDto): Promise<string> {
    try {
      const clienteExist = await this.ClienteRepo.findOneBy({
        email: loginDTO.email,
      });
      if (!clienteExist)
        throw new NotFoundException('email non esistente' + new Date());
      if (clienteExist.password === loginDTO.password) {
        const payload = {
          sub: clienteExist.CodiceCliente,
          nome: clienteExist.nome,
        };
        const accessToken = await this.jwtService.signAsync(payload);
        return accessToken;
      } else
        throw new UnauthorizedException('Password non valida' + new Date());
    } catch (error) {
      console.log(error);
      throw new Error('errore service' + new Date());
    }
  }

  async findOne(codiceCliente: string): Promise<RestituisciCliente> {
    try {
      const clienteExist = await this.ClienteRepo.findOneBy({
        CodiceCliente: codiceCliente,
      });
      if (!clienteExist)
        throw new NotFoundException('cliente non esiste' + new Date());
      return clienteExist;
    } catch (error) {}
  }
}
