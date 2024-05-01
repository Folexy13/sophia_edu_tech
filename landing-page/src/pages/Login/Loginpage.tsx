import React from "react";
import "./Loginpage.styles.scss";
import { Button, Col, Form, Input, Row } from "antd";

const Loginpage: React.FC<any> = () => {
	return (
		<div className="login">
			<Row style={{}}>
				{/* Desktop View */}
				<Col xs={{ span: 0 }} lg={{ span: 12 }}>
					<div style={{ textAlign: "center" }}>
						<img
							src="your-image-url.jpg"
							alt="Login"
							style={{ maxWidth: "100%", maxHeight: "100%" }}
						/>
					</div>
				</Col>
				<Col xs={{ span: 24 }} lg={{ span: 12 }}>
					<div className="login-container" style={{}}>
						<h2>Login</h2>
						<p className="inter-normal">
							Enter email address and passord to login
						</p>
						<Form layout="vertical">
							<Form.Item label="Email address">
								<Input />
							</Form.Item>
							<Form.Item label="Password">
								<Input.Password />
							</Form.Item>
							<Form.Item>
								<Button type="primary" block>
									Log in
								</Button>
							</Form.Item>
						</Form>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default Loginpage;
