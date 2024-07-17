import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { APPCONSTANTS } from "./utils/constants";
import {
	AboutCoursePage,
	CourseLearningPage,
	CourseListingPage,
	ForgotPasswordPage,
	GenerateCertPage,
	Homepage,
	LoginPage,
	MessagingPage,
	MyProfilePage,
	NotificationsPage,
	OthersProfilePage,
	RegisterPage,
	UploadPage,
	WalletPage,
} from "./pages/STUDENT";
import { getStoredAuthToken } from "./utils/storage";
import {
	CoursePage,
	CreateCoursePage,
	OverviewPage,
	SettingsPage,
	StudentsPage,
	TutorWalletPage,
} from "./pages/TUTOR";

const Router: React.FC = () => {
	const authenticated = getStoredAuthToken();

	return (
		<BrowserRouter>
			<Routes>
				{/* Public Routes */}
				{!authenticated && (
					<>
						<Route path={APPCONSTANTS.ROUTES[1].path} element={<LoginPage />} />
						<Route
							path={APPCONSTANTS.ROUTES[2].path}
							element={<RegisterPage />}
						/>
						<Route
							path={APPCONSTANTS.ROUTES[13].path}
							element={<ForgotPasswordPage />}
						/>
						{/* Redirect to login page if not authenticated */}
						<Route
							path="*"
							element={<Navigate to={APPCONSTANTS.ROUTES[1].path} />}
						/>
					</>
				)}

				{/* Private Routes */}
				{authenticated && (
					<>
						<Route path={APPCONSTANTS.ROUTES[0].path} element={<Homepage />} />
						<Route
							path={APPCONSTANTS.ROUTES[3].path}
							element={<CourseListingPage />}
						/>
						<Route
							path={APPCONSTANTS.ROUTES[4].path}
							element={<AboutCoursePage />}
						/>
						<Route
							path={APPCONSTANTS.ROUTES[5].path}
							element={<CourseLearningPage />}
						/>
						<Route
							path={APPCONSTANTS.ROUTES[6].path}
							element={<MyProfilePage />}
						/>
						<Route
							path={APPCONSTANTS.ROUTES[7].path}
							element={<OthersProfilePage />}
						/>
						<Route
							path={APPCONSTANTS.ROUTES[8].path}
							element={<WalletPage />}
						/>
						<Route
							path={APPCONSTANTS.ROUTES[9].path}
							element={<GenerateCertPage />}
						/>
						<Route
							path={APPCONSTANTS.ROUTES[10].path}
							element={<NotificationsPage />}
						/>
						<Route
							path={APPCONSTANTS.ROUTES[11].path}
							element={<UploadPage />}
						/>
						<Route
							path={APPCONSTANTS.ROUTES[12].path}
							element={<MessagingPage />}
						/>

						{/* Redirect to homepage if accessing login/register/forgot password */}
						<Route
							path={APPCONSTANTS.ROUTES[1].path}
							element={<Navigate to="/" />}
						/>
						<Route
							path={APPCONSTANTS.ROUTES[2].path}
							element={<Navigate to="/" />}
						/>
						<Route
							path={APPCONSTANTS.ROUTES[13].path}
							element={<Navigate to="/" />}
						/>

						<Route
							path={APPCONSTANTS.ROUTES[14].path}
							element={<OverviewPage />}
						/>
						<Route
							path={APPCONSTANTS.ROUTES[15].path}
							element={<CoursePage />}
						/>
						<Route
							path={APPCONSTANTS.ROUTES[16].path}
							element={<CreateCoursePage />}
						/>
						<Route
							path={APPCONSTANTS.ROUTES[17].path}
							element={<StudentsPage />}
						/>
						<Route
							path={APPCONSTANTS.ROUTES[18].path}
							element={<TutorWalletPage />}
						/>
						<Route
							path={APPCONSTANTS.ROUTES[19].path}
							element={<SettingsPage />}
						/>
					</>
				)}
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
