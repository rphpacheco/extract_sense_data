import { Schema, model } from 'mongoose';

export default class GenericModel {
  constructor(collection) {
    this.collection = collection;
    return this.model();
  }

  model() {
    const gerericModel = new Schema({}, { strict: false });
    return model(this.collection, gerericModel);
  }
}
