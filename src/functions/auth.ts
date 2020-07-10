import storage from 'node-persist';

import api from '../services/api';

interface Auth {
  code: number;
  message: string;
  access_token: string;
  refresh_token: string;
  date_expiration_access_token: string;
  date_expiration_refresh_token: string;
  date_activated: string;
  api_host: string;
  store_id: string;
}

const auth = async (): Promise<Auth> => {
  await storage.init();

  const response = await api.post('/auth', {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    code: process.env.CONSUMER_CODE,
  });

  await storage.setItem('auth', response.data);

  return response.data;
};

export default auth;
