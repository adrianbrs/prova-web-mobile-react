import axios, { AxiosRequestConfig } from "axios";

export const normalizePaths = (...paths: string[]) => {
  if (!paths || !paths.length) {
    return "/";
  }
  return ("/" + paths.join("/")).replace(/\/+/g, "/").replace(/\/+$/, "");
};

export class ApiResource<T = any> {
  public static BASE_URL = process.env.API_BASE_URL || "http://localhost:9092";

  public axios = axios.create({
    baseURL: ApiResource.BASE_URL + normalizePaths(this.path),
    headers: {
      "Content-Type": "application/json",
    },
  });

  constructor(public path: string) {}

  get<R = T | T[]>(url: string | number = "", config?: AxiosRequestConfig) {
    return this.axios
      .get(url?.toString() || "", config)
      .then((res) => res.data as R);
  }

  post<R = T>(
    url: string | number = "",
    data: any,
    config?: AxiosRequestConfig
  ) {
    return this.axios
      .post(url?.toString() || "", data, config)
      .then((res) => res.data as R);
  }

  delete(url: string | number = "", config?: AxiosRequestConfig) {
    return this.axios.delete(url?.toString() || "", config);
  }

  all(config?: AxiosRequestConfig) {
    return this.get<T[]>("/all");
  }

  byid(id: string | number, config?: AxiosRequestConfig) {
    return this.get<T>(`/byId/${id}`);
  }

  createOrUpdateOne<D = T>(data: D, config?: AxiosRequestConfig) {
    return this.post<D>("", data, config);
  }
}
