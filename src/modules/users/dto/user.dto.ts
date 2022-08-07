import { Expose } from 'class-transformer';
import { PublicFile } from 'src/entities/public-file.entity';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  provider: string;

  @Expose()
  socialId: string;

  @Expose()
  name: string;

  @Expose()
  status: string;

  @Expose()
  photo: PublicFile;
}
