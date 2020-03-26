import * as env from 'dotenv';

import Api from '../../services/api';

import GenericModel from '../models/GenericModel';

import '../../database';

env.config();

export default class ExtractController {
  constructor(entity) {
    this.entity = entity;
    return this.init();
  }

  async init() {
    const totalRecords = await this.getTotalRecords(this.entity);
    const totalPages = Math.ceil(totalRecords / process.env.PER_PAGE);

    const Model = new GenericModel(`sensedata_${this.entity}`);

    if (Model.collection.name.length !== 0) {
      Model.collection.drop();
    }

    const pages = this.getListOfPages(totalPages);

    const promises = pages.map(async page => {
      const url = this.generateUrl(page);

      try {
        const request = await Api.get(url);

        request.data.status.data.map(async record => {
          const collectionData = new Model(record);
          await collectionData.save();
        });
      } catch (err) {
        throw new Error(err);
      }
    });

    await Promise.all(promises);
  }

  async getTotalRecords(entity) {
    const total = await Api.get(`/${entity}`);
    return total.data.status.count;
  }

  getListOfPages(total) {
    const list = [];

    for (let i = 1; i <= total; i += 1) {
      list.push(i);
    }

    return list;
  }

  generateUrl(page) {
    return `/${this.entity}?per_page=${process.env.PER_PAGE}&page=${page}`;
  }
}
