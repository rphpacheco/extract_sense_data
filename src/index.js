import Console from 'console';

import ExtractController from './app/controllers/ExtractController';

import entities from './config/entities';

import logger from './services/logger';

Console.log(`init of process`);

async function getData() {
  const promises = entities.map(async entity => {
    const startEntityTime = new Date();

    try {
      await new ExtractController(entity);

      logger.log(
        `time process of ${entity} : ${(new Date() - startEntityTime) /
          1000} seconds`
      );

      Console.log(`end process of ${entity}`);
    } catch (err) {
      throw new Error(err);
    }
  });

  await Promise.all(promises);

  Console.log(`end of process`);
}

getData();
