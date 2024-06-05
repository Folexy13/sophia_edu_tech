import { BrowserRouter, Routes, Route } from "react-router-dom";
import { APPCONSTANTS } from "./utils/constants";
import {
	AboutCoursePage,
	CourseLearningPage,
	CourseListingPage,
	GenerateCertPage,
	Homepage,
	MyProfilePage,
	NotificationsPage,
	OthersProfilePage,
	UploadPage,
	WalletPage,
} from "./pages/STUDENT"; // Import your page components

const Router: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
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
				<Route path={APPCONSTANTS.ROUTES[6].path} element={<MyProfilePage />} />
				<Route
					path={APPCONSTANTS.ROUTES[7].path}
					element={<OthersProfilePage />}
				/>
				<Route path={APPCONSTANTS.ROUTES[8].path} element={<WalletPage />} />
				<Route
					path={APPCONSTANTS.ROUTES[9].path}
					element={<GenerateCertPage />}
				/>
				<Route
					path={APPCONSTANTS.ROUTES[10].path}
					element={<NotificationsPage />}
				/>
				<Route path={APPCONSTANTS.ROUTES[11].path} element={<UploadPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
