import { BrowserRouter, Routes, Route } from "react-router-dom";
import { APPCONSTANTS } from "./constants";
import {
	Aboutpage,
	ContactPage,
	Forgotpage,
	Homepage,
	Loginpage,
	Privacypage,
	Registerpage,
	SetNewPasswordPage,
	Termspage,
} from "./pages";

const Router: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={APPCONSTANTS.ROUTES[0].path} element={<Homepage />} />
				<Route path={APPCONSTANTS.ROUTES[1].path} element={<Loginpage />} />
				<Route path={APPCONSTANTS.ROUTES[2].path} element={<Registerpage />} />
				<Route path={APPCONSTANTS.ROUTES[3].path} element={<Aboutpage />} />
				<Route path={APPCONSTANTS.ROUTES[4].path} element={<Privacypage />} />
				<Route path={APPCONSTANTS.ROUTES[5].path} element={<Termspage />} />
				<Route path={APPCONSTANTS.ROUTES[6].path} element={<Forgotpage />} />
				<Route
					path={APPCONSTANTS.ROUTES[7].path}
					element={<SetNewPasswordPage />}
				/>
				<Route path={APPCONSTANTS.ROUTES[8].path} element={<ContactPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
