import api from "../Api";

class AdminRequests {
	createInstructor = async (data: any) => {
		try {
			const response = await api.post(`/admin/instructors`, data);
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

	createBlog = async (data: any) => {
		try {
			const response = await api.post(`/blogs`, data);
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

	getInstructors = async () => {
		try {
			const response = await api.get(`/admin/instructors`);
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

const adminRequests = new AdminRequests();
export default adminRequests;
