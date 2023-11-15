import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProdottoService } from './prodotto.service';
import { CreateProdottoDto } from './dto/create-prodotto.dto';
import { OVProdottoDto } from './dto/ordina-vendi-prodotto.dto';

@Controller('prodotto')
export class ProdottoController {
  constructor(private readonly prodottoService: ProdottoService) {}

  @Post()
  create(@Body() createProdottoDto: CreateProdottoDto) {
    try {
      return this.prodottoService.inserisciP(createProdottoDto);
    } catch (error) {
      throw new Error('Errore');
    }
  }

  @Patch('ordina/:id')
  ordina(@Param('id') id: number, @Body() updateProdottoDto: OVProdottoDto) {
    return this.prodottoService.ordina(updateProdottoDto, id);
  }
  @Patch('vendi/:id')
  vendi(@Param('id') id: number, @Body() updateProdottoDto: OVProdottoDto) {
    return this.prodottoService.vendi(updateProdottoDto, id);
  }
}
