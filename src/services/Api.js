import axios from "axios";

class ApiService {
  constructor() {
    this.apiInstance = axios.create({
      baseURL:
        "https://irregular-verbs-progect-default-rtdb.europe-west1.firebasedatabase.app",
    });
  }

  post(url, data = {}, header = {}) {
    return this.apiInstance.post(url.concat(".json"), data, header);
  }

  get(url, header = {}) {
    return this.apiInstance.get(url.concat(".json"), header);
  }

  patch(url, data = {}, header = {}) {
    return this.apiInstance.patch(url.concat(".json"), data, header);
  }

  delete(url, header = {}) {
    return this.apiInstance.delete(url.concat(".json"), header);
  }
}

export const apiService = new ApiService();
