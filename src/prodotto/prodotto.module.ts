import { Module } from '@nestjs/common';
import { ProdottoService } from './prodotto.service';
import { ProdottoController } from './prodotto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prodotto } from './entities/prodotto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prodotto])],
  controllers: [ProdottoController],
  providers: [ProdottoService],
})
export class ProdottoModule {}
