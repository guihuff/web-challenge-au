import axios, { AxiosError } from 'axios';

export const baseURL = 'http://localhost:3000';

export function setupAPIClient (ctx = undefined) {

  const api = axios.create({
    baseURL,
  });

  return api;
}

export const api = setupAPIClient();