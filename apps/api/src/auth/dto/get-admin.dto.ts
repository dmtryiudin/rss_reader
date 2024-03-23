import { Types } from 'mongoose';
import { IAdmin } from '../entities/admin.entity';

export class GetAdminDto {
  username: string;
  id: Types.ObjectId;

  constructor({ username, _id }: IAdmin) {
    this.username = username;
    this.id = _id;
  }
}
