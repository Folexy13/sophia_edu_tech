import api from "../Api";

class AuthRequests {
	login = async (data: any) => {
		try {
			const response = await api.post(`/login`, data);
			return response;
		} catch (error: any) {
			// Extract the message or create a custom error message
			console.log(error.response?.data);
			const errorMessage =
				error.response?.data?.error ||
				error.response?.data?.message ||
				"failed";
			throw new Error(errorMessage);
		}
	};

	register = async (data: any) => {
		try {
			const response = await api.post(`/register`, data);
			return response;
		} catch (error: any) {
			// Extract the message or create a custom error message
			console.log(error.response?.data);
			const errorMessage =
				error.response?.data?.error ||
				error.response?.data?.message ||
				"failed";
			throw new Error(errorMessage);
		}
	};

	adminLogin = async (data: any) => {
		try {
			const response = await api.post(`/admin/login`, data);
			return response;
		} catch (error: any) {
			// Extract the message or create a custom error message
			console.log(error.response?.data);
			const errorMessage =
				error.response?.data?.error ||
				error.response?.data?.message ||
				"failed";
			throw new Error(errorMessage);
		}
	};
	instructorLogin = async (data: any) => {
		try {
			const response = await api.post(`/instructor/login`, data);
			return response;
		} catch (error: any) {
			// Extract the message or create a custom error message
			console.log(error.response?.data);
			const errorMessage =
				error.response?.data?.error ||
				error.response?.data?.message ||
				"failed";
			throw new Error(errorMessage);
		}
	};
}

const authRequests = new AuthRequests();
export default authRequests;
