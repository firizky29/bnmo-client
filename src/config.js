export const BASE_URL = "http://localhost:3100/";
export const API_URL = `${BASE_URL}api/v1`;
export const API_KEY = process.env.API_KEY;
export const API_EXCHANGE_RATE = `https://api.exchangeratesapi.io/latest?access_key=$(API_KEY)`;