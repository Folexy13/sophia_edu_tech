import api from "../Api";

class StudentRequest {
	enrollForCourse = async (courseId: number) => {
		try {
			const response = await api.post(`course/${courseId}`);
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

const studentRequest = new StudentRequest();
export default studentRequest;
