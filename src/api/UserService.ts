import axios from "axios";
import { GetHeaders } from "../utils/auth_tool";
import { ResponseType } from "../types/app";

export async function GetAllUsers(): Promise<ResponseType<Object | string>> {
  const headers = await GetHeaders()
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/v1/user/all-users`,
      headers
    );
    return {
      status: res.status,
      response: res.data,
    };
  } catch (error: any) {
    console.log(error)
    return {
      status: error.response.status ?? 500,
      response: error.response.data ?? "Error al obtener usuarios",
    };
  }
}

export async function UpdateUserData(data: {
  uid: string;
  newData: object;
}): Promise<ResponseType<Object | string>> {
  const headers = await GetHeaders()
  try {
    const res = await axios.patch(
      `${import.meta.env.VITE_API_URL}/v1/user/update`,
      data,
      headers
    );
    return {
      status: res.status,
      response: res.data,
    };
  } catch (error: any) {
    return {
      status: error.response.status ?? 500,
      response: error.response.data ?? "Error al actualizar usuario",
    };
  }
}

export async function DeleteUser(
  uid: string
): Promise<ResponseType<Object | string>> {
  const headers = await GetHeaders()

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/v1/user/delete?uid=${uid}`,
      headers
    );
    return {
      status: res.status,
      response: res.data,
    };
  } catch (error: any) {
    return {
      status: error.response.status ?? 500,
      response:
        error.response.data ?? "Error al eliminar torneo, intenta nuevamente",
    };
  }
}
