import axios from 'axios';

const SERVER_URL = process.env.apiServer ?? 'http://localhost:3000';

const apiInstance = (contentType?: string) => {
  contentType = contentType || 'application/json';

  return axios.create({
    baseURL: SERVER_URL,
    headers: {
      'Content-Type': contentType,
    },
    withCredentials: true,
  });
};

export default apiInstance;
