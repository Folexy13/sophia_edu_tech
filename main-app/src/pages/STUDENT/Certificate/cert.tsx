import React from "react";
import Layout from "../../Layout";
import { GenerateCert } from "../../../components";
import { useLocation } from "react-router-dom";

const Generate: React.FC<any> = ({}) => {
	const { state } = useLocation();
	// const nav = useNavigate();

	// useEffect(() => {
	// 	alert("hi");

	// 	if (!state) {
	// 		nav(-1);
	// 	}
	// }, []);

	const { publication_name, publication_title, course, doi } = state;
	return (
		<Layout>
			<GenerateCert
				publicationName={publication_name}
				publicationTitle={publication_title}
				course={course}
				doi={doi}
			/>
		</Layout>
	);
};

export default Generate;
