import { BrowserRouter, Routes, Route } from "react-router-dom";
import { APPCONSTANTS } from "./constants";
import { Aboutpage, Homepage } from "./pages"; // Import your page components

const Router: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={APPCONSTANTS.ROUTES[0].path} element={<Homepage />} />
				<Route path={APPCONSTANTS.ROUTES[3].path} element={<Aboutpage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
