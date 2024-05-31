import { HomeOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";

export const URL = {
	HOME: "/",
	LOGIN: "/register",
	REGISTER: "/register",
	CONTACT: "/contact-us",
	ABOUT: "/about-us",
	FORGOT_PASSWORD: "/forgot-password",
	PRIVACY: "/privacy/terms-of-service",
	COURSELISTING: "/course/all",
	ABOUTCOURSE: "/course/1",
	LEARNING: "/course/1/learning",
	BLOG: "/blog",
};

export const APPCONSTANTS = {
	APP_NAME: "Sophia",
	APP_PURPLE: "#800080",
	APP_BLACK: "#121212",
	ROUTES: [
		{
			path: URL.HOME,
			name: "Home",
			icon: HomeOutlined,
		},
		{
			path: URL.LOGIN,
			name: "Login",
			icon: LoginOutlined,
		},
		{
			path: URL.REGISTER,
			name: "Register",
			icon: UserOutlined,
		},
		{
			path: URL.COURSELISTING,
			name: "Course_Listing",
			icon: UserOutlined,
		},
		{
			path: URL.ABOUTCOURSE,
			name: "Course_Details",
			icon: UserOutlined,
		},
		{
			path: URL.LEARNING,
			name: "Course_Learning",
			icon: UserOutlined,
		},
		// Add more routes as needed
	],
};
