import { IApiBaseResponse, IApiLoginParams, IApiLoginResponse, IApiMeResponse } from "@/types/api.type";
import { getPublicHeaders } from "@/utils/api.util";

const AUTH_ENDPOINT = "/auth";

export async function apiLogin(params: IApiLoginParams): Promise<IApiBaseResponse<IApiLoginResponse>> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${AUTH_ENDPOINT}/login`, {
    method: "POST",
    headers: getPublicHeaders(),
    body: JSON.stringify(params),
  });

  const resp = (await response.json()) as IApiBaseResponse<IApiLoginResponse>;

  return resp;
}
