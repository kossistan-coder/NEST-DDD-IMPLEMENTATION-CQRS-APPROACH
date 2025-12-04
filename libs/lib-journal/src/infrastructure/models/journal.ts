import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';

@Schema({
  collection: 'marketplace_journals',
  timestamps: true,
})
export class Journal extends Document {
  @Prop({ type: String, required: true })
  level: string;

  @Prop({ type: String, required: true })
  message: string;

  @Prop({ type: mongoose.Schema.Types.Mixed, default: {} })
  data: Record<string, any> = {};

  @Prop({ type: Boolean, default: true })
  active: boolean;

  @Prop({ type: Boolean, default: false })
  deleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date | null;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const JournalSchema = SchemaFactory.createForClass(Journal);

export type JournalDocument = HydratedDocument<Journal>;
