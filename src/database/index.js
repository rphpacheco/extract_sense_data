import mongoose from 'mongoose';

import Config from '../config';

class Database {
  constructor() {
    this.init();
  }

  async init() {
    try {
      this.mongo_connection = await mongoose.connect(
        Config.getConnectionString(),
        Config.getConnectionParams()
      );
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new Database();
