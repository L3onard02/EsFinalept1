import { IsNotEmpty, IsPositive, isNumber } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';
export class CreateProdottoDto {
  @IsNotEmpty()
  @PrimaryColumn()
  idProdotto: number;
  @Column()
  @IsNotEmpty()
  nomeProdotto: string;
  @Column()
  @IsNotEmpty()
  @IsPositive()
  giacenza: number;
  @Column()
  @IsNotEmpty()
  @IsPositive()
  quantitàMinimaOrdine: number;
  @Column()
  @IsNotEmpty()
  @IsPositive()
  prezzo: number;
}
