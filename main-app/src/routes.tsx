import { BrowserRouter, Routes, Route } from "react-router-dom";
import { APPCONSTANTS } from "./utils/constants";
import { AboutCoursePage, CourseListingPage, Homepage } from "./pages/STUDENT"; // Import your page components

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
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
