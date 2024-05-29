import React from "react";
import Layout from "../Layout";
import { Modal } from "../../components";
const HomePage: React.FC = () => {
	return (
		<Layout>
			<Modal isOpen={true} />
		</Layout>
	);
};

export default HomePage;
