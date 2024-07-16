// utils/storage.ts
const AUTH_TOKEN_KEY = "token";
const TOKEN_EXPIRATION_KEY = "token_expiration";
const ONE_HOUR_MS = 60 * 60 * 1000;

export const getStoredAuthToken = () => {
	const token = sessionStorage.getItem(AUTH_TOKEN_KEY);
	const expiration = sessionStorage.getItem(TOKEN_EXPIRATION_KEY);

	if (token && expiration) {
		const now = new Date().getTime();
		if (now < Number(expiration)) {
			return token;
		} else {
			removeStoredAuthToken();
		}
	}
	return null;
};

export const setStoredAuthToken = (token: string) => {
	const now = new Date().getTime();
	const expiration = now + ONE_HOUR_MS;
	sessionStorage.setItem(AUTH_TOKEN_KEY, token);
	sessionStorage.setItem(TOKEN_EXPIRATION_KEY, expiration.toString());
};

export const removeStoredAuthToken = () => {
	sessionStorage.removeItem(AUTH_TOKEN_KEY);
	sessionStorage.removeItem(TOKEN_EXPIRATION_KEY);
};

export const storeAdminUser = (user: string) =>
	sessionStorage.setItem("SadminUser", user);
export const getStoredAdminUser = () => sessionStorage.getItem("SadminUser");

export const storeClientUser = (user: string) =>
	sessionStorage.setItem("SClientUser", user);
export const getStoredClientUser = () => sessionStorage.getItem("SClientUser");
