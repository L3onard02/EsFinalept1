import { IsDate, IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { Column, PrimaryColumn } from 'typeorm';
import { Transform } from 'class-transformer';

export class CreateClienteDto {
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
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'Data di nascita non valida' })
  DataDiNascita: Date;
  @Column()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email non valida' })
  email: string;
  @Column()
  @IsNotEmpty()
  @Length(8, 255, {
    message: 'La password deve essere lunga almeno 8 caratteri',
  })
  password: string;
}
