import { Schema, Document, model } from "mongoose";

export type objectID = Schema.Types.ObjectId;
export interface IEvent extends Document {
  title: string;
  notes: string;
  dateStart: Date;
  dateEnd: Date;
  user: Schema.Types.ObjectId;
}
const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: false,
  },
  dateStart: {
    type: Date,
    required: true,
  },
  dateEnd: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
eventSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
export default model<IEvent>("Event", eventSchema);
