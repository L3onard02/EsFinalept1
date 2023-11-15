import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Column } from 'typeorm';

export class loginClienteDto {
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
