import axios from "axios";

class ApiService {
  constructor() {
    this.apiInstance = axios.create({
      baseURL:
        "https://irregular-verbs-e64f2-default-rtdb.europe-west1.firebasedatabase.app",
    });
  }

  post(url, data = {}, header = {}) {
    return this.apiInstance.post(url.concat(".json"), data, header);
  }

  get(url, header = {}) {
    return this.apiInstance.get();
  }
}

export const apiService = new ApiService();
