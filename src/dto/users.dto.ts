import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class Registration {
  @ApiProperty()
  @IsNotEmpty()
  userName: string;
  @ApiProperty()
  @IsNotEmpty()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class AddPointOfContact {
  @ApiProperty()
  @IsNotEmpty()
  pocName: string;
  @ApiProperty()
  @IsNotEmpty()
  pocPhoneNumber: number;
  @ApiProperty()
  @IsNotEmpty()
  pocEmail: string;
  @ApiProperty()
  pocDesignation: string;
  statusID: number;
  updatedBy: number;
}
