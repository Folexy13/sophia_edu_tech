import api from "../Api";
import { UserProps } from "../store";

class ClientRequests {
	getMe = async () => {
		try {
			const response = await api.get(`/profile`);
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

	updateMe = async (data: UserProps) => {
		try {
			const response = await api.put(`/profile`, data);
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

const clientRequests = new ClientRequests();
export default clientRequests;
