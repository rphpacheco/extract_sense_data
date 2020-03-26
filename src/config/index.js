import * as env from 'dotenv';

env.config();

class Config {
  getConnectionString() {
    return `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;
  }

  getConnectionParams() {
    return {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    };
  }
}

export default new Config();
