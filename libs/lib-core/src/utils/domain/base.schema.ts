import { Types } from 'mongoose';

export class BaseSchema {
  static mongoId(id: string): Types.ObjectId {
    const trimedId = id;

    if (Types.ObjectId.isValid(trimedId)) {
      return new Types.ObjectId(trimedId);
    } else {
      throw new Error(`Invalid ObjectId: ${id}`);
    }
  }
}
