import { API_URLS } from "../constants/api-urls";
import { INITIAL_ARRAY } from "../constants/initialArray";
import { apiService } from "../services/Api";

export const createInitialArray = (uid) => {
  return INITIAL_ARRAY.map((item) => {
    return apiService.post(`${uid}/${API_URLS.title}`, item);
  });
};

export const createWordApi = (userId, data) => {
  return apiService.post(`${userId}/${API_URLS.title}`, data);
};

export const getWordApi = (userId) => {
  return apiService.get(`${userId}/${API_URLS.title}`);
};

export const deleteWordApi = (userId, wordsId) => {
  return apiService.delete(`${userId}/${API_URLS.title}/${wordsId}`);
};

export const updateWordApi = (userId, wordsId, data) => {
  return apiService.patch(`${userId}/${API_URLS.title}/${wordsId}`, data);
};
