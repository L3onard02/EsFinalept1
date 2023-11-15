import { IsDate, IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { Column, PrimaryColumn } from 'typeorm';
export class RestituisciCliente {
  @IsNotEmpty()
  @PrimaryColumn()
  @Matches(/^[A-Z]{5}$/, {
    message: 'Il codice cliente deve contenere 5 caratteri maiuscoli',
  })
  CodiceCliente: string;
  @Column()
  @IsNotEmpty()
  nome: string;
  @Column()
  @IsNotEmpty()
  cognome: string;
  @Column()
  @IsNotEmpty()
  @IsDate({ message: 'Data di nascita non valida' })
  DataDiNascita: Date;
  @Column()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email non valida' })
  email: string;
}
