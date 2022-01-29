import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";

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
  const { access_token: token } = data.data;
  return token;
};

export const api = async (
  url: string,
  options: AxiosRequestHeaders = {}
): Promise<AxiosResponse> => {
  const token = await getToken();
  return axios(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...options,
  });
};
