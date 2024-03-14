import { IApiBaseResponse, IApiMeResponse } from "@/types/api.type";
import { getPrivateHeaders } from "@/utils/api.util";

const ME_ENDPOINT = "/me";

export async function apiGetMe(): Promise<IApiBaseResponse<IApiMeResponse>> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${ME_ENDPOINT}`, {
    method: "GET",
    headers: getPrivateHeaders(),
  });

  const resp = (await response.json()) as IApiBaseResponse<IApiMeResponse>;

  return resp;
}
