import { BrowserRouter, Routes, Route } from "react-router-dom";
import { APPCONSTANTS } from "./constants";
import {
	Aboutpage,
	Homepage,
	Loginpage,
	Privacypage,
	Termspage,
} from "./pages"; // Import your page components

const Router: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={APPCONSTANTS.ROUTES[0].path} element={<Homepage />} />
				<Route path={APPCONSTANTS.ROUTES[1].path} element={<Loginpage />} />
				<Route path={APPCONSTANTS.ROUTES[3].path} element={<Aboutpage />} />
				<Route path={APPCONSTANTS.ROUTES[4].path} element={<Privacypage />} />
				<Route path={APPCONSTANTS.ROUTES[5].path} element={<Termspage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
