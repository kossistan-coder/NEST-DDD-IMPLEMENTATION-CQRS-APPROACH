import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { ulid } from 'ulidx';

export class BaseModel extends Document {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    index: true,
    unique: true,
    default: () => ulid(),
  })
  uid: string;

  @Prop({ type: Boolean, default: true })
  active: boolean;

  @Prop({ type: Boolean, default: false })
  deleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date | null;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const BaseModelSchema = SchemaFactory.createForClass(BaseModel);

export type BaseModelDocument = HydratedDocument<BaseModel>;
