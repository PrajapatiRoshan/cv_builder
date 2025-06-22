import { Document, model, Schema, Types } from 'mongoose';
import { ProviderEnum, ProviderEnumType } from '../enums/accounts-provides.enum';

export interface AccountDocument extends Document {
  userId: Types.ObjectId;
  provider: ProviderEnumType;
  providerId: string;
  refreshToken: string | null;
  tokenExpiry: Date | null;
  createdAt: Date;
}

const accountSchema = new Schema<AccountDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    provider: {
      type: String,
      enum: Object.values(ProviderEnum),
      required: true,
    },
    providerId: {
      type: String,
      required: true,
      unique: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    tokenExpiry: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.refreshToken;
      },
    },
  }
);

const AccountModel = model<AccountDocument>('Account', accountSchema);

export default AccountModel;

