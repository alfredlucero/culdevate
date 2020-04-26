import axios, { AxiosError } from "axios";
import { Recap, RecapCreate } from "./recaps.interface";

export const getRecaps = (): Promise<Recap[]> => {
  return axios
    .get<Recap[]>("/recaps")
    .then(response => response.data)
    .catch((error: AxiosError) => {
      throw new Error(`${error.code} error: ${error.message}`);
    });
};

export const createRecap = (recapToCreate: RecapCreate): Promise<Recap> => {
  return axios
    .post<Recap>("/recaps", recapToCreate)
    .then(response => response.data)
    .catch((error: AxiosError) => {
      throw new Error(`${error.code} error: ${error.message}`);
    });
};

export const updateRecap = ({ _id, userId, ...updatedRecap }: Recap): Promise<Recap> => {
  return axios
    .patch<Recap>(`/recaps/${_id}`, updatedRecap)
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
