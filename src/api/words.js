import { log } from "handlebars";
import { API_URLS } from "../constants/api-urls";
import { INITIAL_ARRAY } from "../constants/initialArray";
import { useUserStore } from "../hooks/useUserStore";
import { apiService } from "../services/Api";

export const createInitialArray = () => {
  const { getUser } = useUserStore();
  const user = getUser();
  INITIAL_ARRAY.forEach((item) => {
    apiService.post(`${user.uid}/${API_URLS.words}`, item);
  });
};

export const createWordApi = (userId, data) => {
  return apiService.post(`${userId}/${API_URLS.words}`, data);
};

export const getWordApi = (userId) => {
  return apiService.get(`${userId}/${API_URLS.words}`);
};

export const deleteWordApi = (userId, boardId) => {
  return apiService.delete(`${userId}/${API_URLS.words}/${wordsId}`);
};
