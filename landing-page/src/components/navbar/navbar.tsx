import { Col, Row } from "antd";
import React from "react";
import { logo } from "../../assets";
import { Button } from "..";
import { Link } from "react-router-dom";
import { URL } from "../../constants";

const Navbar: React.FC = () => {
	return (
		<Row justify="space-between" align="top">
			<Link to={URL.HOME}>
				<Col xs={12} sm={10} md={8} lg={6} xl={5}>
					{/* Your logo component */}
					<img src={logo} alt="Logo" />
				</Col>
			</Link>
			<Link to={URL.LOGIN}>
				<Button>Login</Button>
			</Link>
		</Row>
	);
};

export default Navbar;
