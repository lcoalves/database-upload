import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.lojadafamilia.org.br/web_api',
  timeout: 30000,
});

export default api;
