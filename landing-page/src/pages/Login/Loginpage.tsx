import React from "react";
import "./Loginpage.styles.scss";
import { Col, Form, Input, Row } from "antd";
import { APPCONSTANTS, URL } from "../../constants";
import { Button } from "../../components";
import { Link } from "react-router-dom";
import { logo, student, woman } from "../../assets";

const Loginpage: React.FC<any> = () => {
	return (
		<div className="login">
			<Row style={{}}>
				{/* Desktop View */}
				<Col xs={{ span: 0 }} lg={{ span: 12 }}>
					<div className="first-container">
						<img
							src={logo}
							alt="Login"
							style={{ maxWidth: "100%", maxHeight: "100%" }}
						/>
						<div className="main">
							<img src={student} alt="students studying" />
							<img src={woman} alt="graduating woman" />
						</div>
						<h2 className="inter-bold">Welcome Back!!</h2>
						<p className="inter-normal">
							Lorem ipsum dolor sit amet consectetur. At morbi in amet et sed.
						</p>
					</div>
				</Col>
				<Col xs={{ span: 24 }} lg={{ span: 12 }}>
					<div className="login-container" style={{}}>
						<h2>Login</h2>
						<p className="inter-normal">
							Enter email address and password to login
						</p>
						<Form layout="vertical">
							<Form.Item label="Email address" className="inter-normal">
								<Input />
							</Form.Item>
							<Form.Item label="Password" className="inter-normal">
								<Input.Password />
							</Form.Item>
							<Form.Item className="inter-bold">
								<Link
									to={URL.FORGOT_PASSWORD}
									style={{
										color: APPCONSTANTS.APP_DARK_PURPLE,
										float: "right",
									}}
								>
									Forgot password?
								</Link>
							</Form.Item>
							<Form.Item className="inter-normal">
								<Button height={50} width={"100%"}>
									Log in
								</Button>
							</Form.Item>
							<Form.Item
								className="inter-normal"
								style={{ textAlign: "center" }}
							>
								Don't have an account?{" "}
								<Link
									to={URL.REGISTER}
									className="inter-bold"
									style={{ color: "#581A57" }}
								>
									Become a member
								</Link>
							</Form.Item>
							<Form.Item>
								<div className="option">
									<span className="line"></span>
									<p style={{ marginTop: 30 }}>or</p>
									<span className="line"></span>
								</div>
							</Form.Item>
						</Form>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default Loginpage;
