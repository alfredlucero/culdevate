import axios, { AxiosError } from "axios";
import { Recap } from "./recaps.interface";

export const getRecaps = (): Promise<Recap[]> => {
  return axios
    .get<Recap[]>("/recaps")
    .then(response => response.data)
    .catch((error: AxiosError) => {
      throw new Error(`${error.code} error: ${error.message}`);
    });
};

export const createRecap = (recapToCreate: Omit<Recap, "_id">): Promise<Recap> => {
  return axios
    .post<Recap>("/recaps", recapToCreate)
    .then(response => response.data)
    .catch((error: AxiosError) => {
      throw new Error(`${error.code} error: ${error.message}`);
    });
};

export const updateRecap = (updatedRecap: Recap): Promise<Recap> => {
  return axios
    .patch<Recap>(`/recaps/${updatedRecap._id}`, updatedRecap)
    .then(response => response.data)
    .catch((error: AxiosError) => {
      throw new Error(`${error.code} error: ${error.message}`);
    });
};

export const deleteRecap = (recapId: Recap["_id"]): Promise<Recap> => {
  return axios
    .delete<Recap>(`/recaps/${recapId}`)
    .then(response => response.data)
    .catch((error: AxiosError) => {
      throw new Error(`${error.code} error: ${error.message}`);
    });
};