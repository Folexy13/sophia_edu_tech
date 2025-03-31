import api from "../Api";
import {UserProps} from "../store";

class ClientRequests {
    getMe = async (isAdmin?: boolean) => {
        try {
            const response = await api.get(`${isAdmin ? '/admin' : ''}/profile`);
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

    sendMessage = async (payload: any) => {
        try {
            const response = await api.post(`/messages`, payload);
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

    getMyMessages = async () => {
        try {
            const response = await api.get(`/messages`);
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

    getFriendMessage = async (userId: number) => {
        try {
            const response = await api.get(`/messages/${userId}`);
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

    markReadMessage = async (message_id: string) => {
        try {
            const response = await api.put(`/messages/${message_id}`);
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

    uploadPost = async (payload: any) => {
        try {
            const response = await api.post(`/user/posts`, payload);
            return response;
        } catch (error: any) {
            // Extract the message or create a custom error message
            console.log(error);
            const errorMessage =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "failed";
            throw new Error(errorMessage);
        }
    }

    getPosts = async () => {
        try {
            const response = await api.get(`/user/posts`);
            return response;
        } catch (error: any) {
            // Extract the message or create a custom error message
            console.log(error);
            const errorMessage =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "failed";
            throw new Error(errorMessage);
        }
    }
}

const clientRequests = new ClientRequests();
export default clientRequests;
