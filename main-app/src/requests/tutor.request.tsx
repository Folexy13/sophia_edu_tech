import api from "../Api";

class TutorRequests {
    createCourse = async (data: any) => {
        try {
            const response = await api.post(`/courses`, data);
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

    updateCourse = async (data: any) => {
        try {
            const response = await api.put(`/course${data?.courseId}`, data);
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

    deleteCourse = async (courseId: number) => {
        try {
            const response = await api.delete(`/course/${courseId}`);
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
    uploadCourseVideo = async (data: any) => {
        try {
            const response = await api.post(
                `/upload_course_video/${data?.courseId}`,
                data
            );
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

    createCourseModule = async (data: any) => {

        try {
            const response = await api.post(`/modules`, data);
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

    fetchMyCourses = async () => {
        try {
            const response = await api.get(`/instructor/courses`);
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

const tutorRequests = new TutorRequests();
export default tutorRequests;
