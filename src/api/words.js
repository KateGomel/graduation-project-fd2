import { log } from "handlebars";
import { API_URLS } from "../constants/api-urls";
import { INITIAL_ARRAY } from "../constants/initialArray";
import { useUserStore } from "../hooks/useUserStore";
import { apiService } from "../services/Api";

export const createInitialArray = () => {
  const { getUser } = useUserStore();
  const user = getUser();
  console.log(user.uid);
  INITIAL_ARRAY.forEach((item) => {
    apiService.post(`${user.uid}/${API_URLS.words}`, item);
  });
};

export const createBoardApi = (userId, data) => {
  return apiService.post(`${userId}/${API_URLS.words}`, data);
};

export const getBoardsApi = (userId) => {
  return apiService.get(`${userId}/${API_URLS.words}`);
};

export const deleteBoardApi = (userId, boardId) => {
  return apiService.delete(`${userId}/${API_URLS.words}/${wordsId}`);
};
