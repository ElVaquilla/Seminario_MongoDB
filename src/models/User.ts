import { ObjectId, Schema, model } from "mongoose";

// Create an interface representing a document in MongoDB.
export interface IUser {
    id: number;
    name: string;
    email: string;
    username: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: {
        lat: string;
        lng: string;
      }
    }
    phone: string;
    website: string;
    company: {
      name: string;
    }
}

// Create a Schema corresponding to the document interface.
const UserSchema = new Schema <IUser>({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true},
  username: { type: String, required: true},
  address: {
    street: String,
    suite: String,
    city: String,
    zipcode: String,
    geo: {
      lat: String,
      lng: String,
    }
  },
  phone: String,
  website: String,
  company: {
    name: String
  }
});

// Create a Model.
export const UserModel =  model("User", UserSchema); 
