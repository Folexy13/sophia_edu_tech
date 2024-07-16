import { useEffect } from "react";
import "./App.scss";
import Router from "./routes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAlert } from "./store";

function App() {
	const { status, message, onReset } = useAlert();

	// Listen to changes in status and display toast accordingly
	useEffect(() => {
		if (status && message) {
			if (status === "success") {
				toast.success(message);
			} else if (status === "error") {
				toast.error(message);
			} else {
				toast.info(message);
			}
			// Reset alert state after displaying toast
			onReset();
		}
	}, [status, message, onReset]);
	return (
		<>
			<ToastContainer />
			<Router />
		</>
	);
}

export default App;
