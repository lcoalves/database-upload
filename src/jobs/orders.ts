import { CronJob } from 'cron';

import orderFunction from '../functions/orders';

const auth = (): void => {
  const Job = new CronJob(
    '*/15 * * * * *',
    async () => {
      console.log(await orderFunction());
    },
    null,
    true,
    'America/Sao_Paulo',
  );

  Job.start();
};

export default auth;
