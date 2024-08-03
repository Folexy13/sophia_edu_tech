import axios, { AxiosHeaders } from "axios";
import { getStoredAuthToken, removeStoredAuthToken } from "../utils/storage";
// import io from "socket.io-client";
export const baseurl = "https://carlomagg675.pythonanywhere.com";
// export const socket = io(baseurl);
const api = axios.create({
	baseURL: `${baseurl}`,
});

api.interceptors.request.use(
	(request: any) => {
		// Cast request.headers to AxiosHeaders
		request.headers = {
			...(request.headers as AxiosHeaders), // Ensure existing headers are preserved
			Authorization: getStoredAuthToken()
				? `Bearer ${getStoredAuthToken()}`
				: undefined, // Only set Authorization header if a token exists
			// other headers...
		};
		return request;
	},
	(error: any) => {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	(response: any) => {
		// console.log("response received");
		if (response?.data?.token) {
			// console.log(getStoredAuthToken());
		}
		return response.data;
	},
	(error: any) => {
		if (error?.response?.data?.authStatus === 403) {
			removeStoredAuthToken();
			window.location.assign("/");
		}
		return Promise.reject(error);
	}
);

export default api;
