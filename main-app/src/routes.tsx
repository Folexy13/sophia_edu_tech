import { BrowserRouter, Routes, Route } from "react-router-dom";
import { APPCONSTANTS } from "./utils/constants";
import { CourseListingPage, Homepage } from "./pages"; // Import your page components

const Router: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={APPCONSTANTS.ROUTES[0].path} element={<Homepage />} />
				<Route
					path={APPCONSTANTS.ROUTES[3].path}
					element={<CourseListingPage />}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
