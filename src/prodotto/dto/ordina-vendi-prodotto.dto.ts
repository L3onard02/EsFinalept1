import { IsNotEmpty, IsPositive } from 'class-validator';
import { Column } from 'typeorm';

export class OVProdottoDto {
  @Column()
  @IsNotEmpty()
  @IsPositive()
  giacenza: number;
}
