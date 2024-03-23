import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
  @Prop({
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 50,
  })
  username: string;

  @Prop({ type: String, required: true })
  password: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
