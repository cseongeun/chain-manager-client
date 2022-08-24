import axios from 'axios';
import { useSession } from 'next-auth/react';

const SERVER_URL = process.env.apiServer ?? 'http://localhost:8000';

const contentType = 'application/json';

export const apiInstance = () => {
  return axios.create({
    baseURL: SERVER_URL,
    headers: {
      'Content-Type': contentType,
    },
    withCredentials: true,
  });
};

export const apiInstanceWithToken = (accessToken: string) => {
  return axios.create({
    baseURL: SERVER_URL,
    headers: {
      'Content-Type': contentType,
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
