import { ApiProperty } from '@nestjs/swagger';

export class LoginAdminDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
