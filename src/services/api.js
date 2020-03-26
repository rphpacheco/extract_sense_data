import axios from 'axios';

import * as env from 'dotenv';

env.config();

class Api {
  constructor() {
    this.init();
  }

  init() {
    return axios.create({
      baseURL: process.env.SD_BASE_URL,
      headers: {
        Authorization: process.env.SD_TOKEN,
      },
    });
  }
}

export default new Api().init();
