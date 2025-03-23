import * as connections from "../config/connection";
import { Schema } from "mongoose";

const salesSchema = new Schema(
  {
    store: {
      type: String,
      default: "",
    },
    items: [
      {
        name: { type: String },
        quantity: { type: Number },
        price: { type: Number },
      },
    ],
    date: Date,
    createdAt: Date,
    updatedAt: Date,
  },
  {
    collection: "sales",
    versionKey: false,
  }
);

export default connections.db.model("sales", salesSchema);
