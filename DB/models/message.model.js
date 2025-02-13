import { model, Schema, Types } from 'mongoose';

const messageSchema = new Schema({
  sender: { type: Types.ObjectId, required: true , ref : "User" },
  receiver: { type: Types.ObjectId, required: true , ref : "User" },
  text : String ,
  img :String 
},{ timestamps: true });

export const Message = model('Message', messageSchema);
