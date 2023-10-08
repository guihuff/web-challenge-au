import axios, { AxiosError } from 'axios';


export function setupAPIClient (ctx = undefined) {

  const api = axios.create({
    baseURL: 'http://localhost:3000',
    // baseURL: 'http://0.0.0.0:3333',
  });

  return api;
}

export const api = setupAPIClient();