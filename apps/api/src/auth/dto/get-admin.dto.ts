import { Types } from 'mongoose';
import { AdminDocument } from '../schemas/admin.schema';

export class GetAdminDto {
  username: string;
  id: Types.ObjectId;

  constructor({ username, _id }: AdminDocument) {
    this.username = username;
    this.id = _id;
  }
}
