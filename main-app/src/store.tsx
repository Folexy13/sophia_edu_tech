import { ReactNode } from "react";
import { create } from "zustand";
export interface UserProps {
	full_name: string;
	email: string;
	password: string;
	phone?: string;
	profile_image?: string;
	location?: any;
	confirm_password: string;
	licenses_certifications?: any[];
	education?: any[];
	work_experience?: any[];
	age: number;
	gender: "male" | "female";
	bio?: string;
	is_subscribed: boolean;
	role: "student" | "admin" | "tutor";
}
interface AuthState {
	authenticated: boolean;
	token: string;
	onLogin: (token: string) => void;
	onLogout: () => void;
}

interface AlertState {
	status: "error" | "success" | "info" | null;
	message: string | null;
	onSuccess: (msg: string) => void;
	onFailure: (msg: string) => void;
	onInfo: (msg: string) => void;
	onReset: () => void;
}

interface ModalState {
	visible: boolean;
	modalTitle: ReactNode;
	modalContent: ReactNode;
	confirmLoading: boolean;
	onOk: () => void;
	onCancel: () => void;
	toggleModal: () => void;
	showConfirmModal: (
		title: ReactNode,
		content: ReactNode,
		onOk: () => void,
		onCancel: () => void
	) => void;
	showConfirmLoadingModal: (
		title: ReactNode,
		content: ReactNode,
		onOk: () => void
	) => void;
}

// Define the UserState interface that includes UserProps and related actions
interface UserState {
	user: UserProps | null;
	admin: UserProps | null;
	setUser: (data: UserProps) => void;
	resetUser: () => void;
}

// Create the user store
export const useUser = create<UserState>((set) => ({
	user: null,
	admin: null,
	setUser: (data: UserProps) => set({ user: data }),
	setAdmin: (data: UserProps) => set({ admin: data }),
	resetUser: () => set({ user: null }),
}));

export const useAuth = create<AuthState>((set) => ({
	authenticated: false,
	token: "",
	onLogin: (token: string) => set({ authenticated: true, token }),
	onLogout: () => set({ authenticated: false, token: "" }),
}));

export const useAlert = create<AlertState>((set) => ({
	status: null,
	message: null,
	onSuccess: (message: string) => set({ status: "success", message }),
	onFailure: (message: string) => set({ status: "error", message }),
	onInfo: (message: string) => set({ status: "error", message }),
	onReset: () => set({ status: null, message: null }),
}));

export const useModal = create<ModalState>((set) => ({
	visible: false,
	modalTitle: "",
	modalContent: "",
	confirmLoading: false,
	onOk: () => {},
	onCancel: () => {},
	toggleModal: () => set((state) => ({ visible: !state.visible })),
	showConfirmModal: (title, content, onOk, onCancel) =>
		set(() => ({
			visible: true,
			modalTitle: title,
			modalContent: content,
			onOk,
			onCancel,
			confirmLoading: false,
		})),
	showConfirmLoadingModal: (title, content, onOk) =>
		set(() => ({
			visible: true,
			modalTitle: title,
			modalContent: content,
			onOk,
			confirmLoading: true,
		})),
}));

export const useAuthToken = () => useAuth((state) => state.token);
export const loggedInUser = () => useUser((state) => state.user);
