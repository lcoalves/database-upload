import { CronJob } from 'cron';

import authFunction from '../functions/auth';

const auth = (): void => {
  const Job = new CronJob(
    '* 59 */2 * * *',
    async () => {
      console.log(await authFunction());
    },
    null,
    true,
    'America/Sao_Paulo',
  );

  Job.start();
};

export default auth;
