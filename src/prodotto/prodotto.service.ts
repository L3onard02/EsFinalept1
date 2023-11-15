import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdottoDto } from './dto/create-prodotto.dto';
import { OVProdottoDto } from './dto/ordina-vendi-prodotto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Prodotto } from './entities/prodotto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProdottoService {
  constructor(
    @InjectRepository(Prodotto)
    private prodottoRepo: Repository<Prodotto>,
  ) {}

  async ordina(prodottoDto: OVProdottoDto, id: number): Promise<string> {
    try {
      const prodottoExists = await this.prodottoRepo.findOneBy({
        idProdotto: id,
      });
      if (prodottoExists) {
        prodottoExists.giacenza =
          prodottoExists.giacenza + prodottoDto.giacenza;
        await this.prodottoRepo.update(id, prodottoExists);
        return await 'prodotto/i ordinati!';
      } else throw new NotFoundException('id non trovato');
    } catch (error) {
      console.log(error);
    }
  }
  async vendi(prodottoDto: OVProdottoDto, id: number): Promise<string> {
    try {
      const prodottoExists = await this.prodottoRepo.findOneBy({
        idProdotto: id,
      });
      if (prodottoExists) {
        if (prodottoExists.giacenza > prodottoDto.giacenza) {
          prodottoExists.giacenza =
            prodottoExists.giacenza - prodottoDto.giacenza;
          await this.prodottoRepo.update(id, prodottoExists);
          return await 'prodotto/i venduti!';
        } else throw new Error('giacenza non sufficente');
      } else throw new NotFoundException('id non trovato');
    } catch (error) {
      console.log(error);
    }
  }
  async inserisciP(prodotto: CreateProdottoDto): Promise<boolean> {
    try {
      const prodottoExist = await this.prodottoRepo.findOneBy({
        idProdotto: prodotto.idProdotto,
      });
      if (!prodottoExist) {
        await this.prodottoRepo.save(prodotto);
        return true;
      } else throw new Error('il prodotto già esiste');
    } catch (error) {
      throw new error();
    }
  }
}
