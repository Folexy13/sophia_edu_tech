import React from "react";
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
	Outlet,
	useLocation,
} from "react-router-dom";
import { getStoredAuthToken, getUserType } from "./utils/storage";

import { APPCONSTANTS } from "./utils/constants";
import {
	AboutCoursePage,
	CertPage,
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
import {
	CoursePage,
	CreateCoursePage,
	OverviewPage,
	SettingsPage,
	StudentsPage,
	TutorLoginPage,
	TutorWalletPage,
} from "./pages/TUTOR";
import {
	AdminBlogPage,
	AdminCoursePage,
	AdminCreateBlogPage,
	AdminCreateInstructorPage,
	AdminEditUserPage,
	AdminInstructorsPage,
	AdminLogin,
	AdminOverviewPage,
	AdminSettingsPage,
	AdminStudentsPage,
	AdminTutorWalletPage,
} from "./pages/ADMIN";

const Router: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				{/* Public Routes */}
				<Route path={APPCONSTANTS.ROUTES[1].path} element={<LoginPage />} />
				<Route path={APPCONSTANTS.ROUTES[2].path} element={<RegisterPage />} />
				<Route
					path={APPCONSTANTS.ROUTES[13].path}
					element={<ForgotPasswordPage />}
				/>
				{/* <Route
					path="*"
					element={<Navigate to={APPCONSTANTS.ROUTES[1].path} />}
				/> */}
				<Route
					path={APPCONSTANTS.ROUTES[30].path}
					element={<TutorLoginPage />}
				/>
				<Route path={APPCONSTANTS.ROUTES[31].path} element={<AdminLogin />} />

				{/* Private Routes */}

				{/* Student Routes */}
				<Route element={<PrivateRoute allowedRoles={["student"]} />}>
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
					<Route path={APPCONSTANTS.ROUTES[8].path} element={<WalletPage />} />
					<Route
						path={APPCONSTANTS.ROUTES[9].path}
						element={<GenerateCertPage />}
					/>
					<Route path={"/new/certificate"} element={<CertPage />} />
					<Route
						path={APPCONSTANTS.ROUTES[10].path}
						element={<NotificationsPage />}
					/>
					<Route path={APPCONSTANTS.ROUTES[11].path} element={<UploadPage />} />
					<Route
						path={APPCONSTANTS.ROUTES[12].path}
						element={<MessagingPage />}
					/>
				</Route>

				{/* Instructor Routes */}
				<Route element={<PrivateRoute allowedRoles={["instructor"]} />}>
					<Route
						path={APPCONSTANTS.ROUTES[14].path}
						element={<OverviewPage />}
					/>
					<Route path={APPCONSTANTS.ROUTES[15].path} element={<CoursePage />} />
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
				</Route>

				{/* Admin Routes */}

				<Route element={<PrivateRoute allowedRoles={["admin"]} />}>
					<Route
						path={APPCONSTANTS.ROUTES[20].path}
						element={<AdminOverviewPage />}
					/>
					<Route
						path={APPCONSTANTS.ROUTES[21].path}
						element={<AdminCoursePage />}
					/>
					<Route
						path={APPCONSTANTS.ROUTES[22].path}
						element={<AdminInstructorsPage />}
					/>
					<Route
						path={APPCONSTANTS.ROUTES[23].path}
						element={<AdminStudentsPage />}
					/>
					<Route
						path={APPCONSTANTS.ROUTES[24].path}
						element={<AdminCreateInstructorPage />}
					/>
					<Route
						path={APPCONSTANTS.ROUTES[25].path}
						element={<AdminTutorWalletPage />}
					/>
					<Route
						path={APPCONSTANTS.ROUTES[26].path}
						element={<AdminBlogPage />}
					/>
					<Route
						path={APPCONSTANTS.ROUTES[27].path}
						element={<AdminCreateBlogPage />}
					/>
					<Route
						path={APPCONSTANTS.ROUTES[28].path}
						element={<AdminSettingsPage />}
					/>
					<Route
						path={APPCONSTANTS.ROUTES[29].path}
						element={<AdminEditUserPage />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

interface PrivateRouteProps {
	allowedRoles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
	const token = getStoredAuthToken(); //true;
	const userType = getUserType();
	const location = useLocation();

	// alert(userType);

	if (!token) {
		// Determine where the user is coming from and redirect accordingly
		const fromPath = location.pathname;

		if (fromPath.startsWith("/admin")) {
			return <Navigate to={APPCONSTANTS.ROUTES[31].path} />;
		} else if (fromPath.startsWith("/instructor")) {
			return <Navigate to={APPCONSTANTS.ROUTES[30].path} />;
		} else if (fromPath.startsWith("/student")) {
			return <Navigate to="/login" />; // Assuming "/login" is the student login page
		} else {
			return <Navigate to="/login" />; // Default to student login
		}
	}

	if (!allowedRoles.includes(userType || "")) {
		if (userType === "student") {
			return <Navigate to={APPCONSTANTS.ROUTES[0].path} />;
		} else if (userType === "instructor") {
			return <Navigate to={APPCONSTANTS.ROUTES[14].path} />;
		} else if (userType === "admin") {
			return <Navigate to={APPCONSTANTS.ROUTES[20].path} />;
		}
	}

	return <Outlet />;
};

export default Router;
