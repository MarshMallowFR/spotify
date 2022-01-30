import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";

let token = "";

export const getToken = async (): Promise<string> => {
  const url = "https://accounts.spotify.com/api/token";
  const data = await axios(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        btoa(
          process.env.VUE_APP_SPOTIFY_CLIENT_ID +
            ":" +
            process.env.VUE_APP_SPOTIFY_CLIENT_SECRET
        ),
    },
    data: "grant_type=client_credentials",
  });
  const { access_token } = data.data;
  token = access_token;
  return access_token;
};

export const api = async (
  url: string,
  options: AxiosRequestHeaders = {}
): Promise<AxiosResponse> => {
  if (!token) {
    token = await getToken();
  }
  return axios(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...options,
  });
};
