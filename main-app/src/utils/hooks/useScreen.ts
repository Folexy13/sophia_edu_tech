import { useState, useEffect } from "react";

export const useScreenSize = () => {
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 680);

	const handleResize = () => {
		setIsMobile(window.innerWidth <= 680);
	};

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return isMobile;
};
