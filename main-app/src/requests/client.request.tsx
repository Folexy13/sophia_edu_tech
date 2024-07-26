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

	deleteProfileEntity = async (
		id: string,
		entity: "education" | "licenses_certifications" | "work_experience"
	) => {
		try {
			const response = await api.delete(`/user/${entity}?id=${id}`);
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

	addProfileEntity = async (
		id: string,
		entity: "education" | "licenses_certifications" | "work_experience",
		data: any
	) => {
		try {
			const response = await api.post(`/user/${entity}?id=${id}`, data);
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

	uploadImage = async (img: any) => {
		try {
			const response = await api.post(`/upload_profile_image`, img);
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
