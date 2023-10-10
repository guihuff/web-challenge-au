import axios, { AxiosError } from 'axios';

// export const baseURL = 'http://localhost:3000';
// production url api
export const baseURL = 'https://api-challenge-au.onrender.com'

export function setupAPIClient (ctx = undefined) {

  const api = axios.create({
    baseURL,
  });

  return api;
}

export const api = setupAPIClient();