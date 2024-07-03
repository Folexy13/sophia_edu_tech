import React from "react";
import "./Loginpage.styles.scss";
import { Col, Form, Input, Row, Button as AntDButton } from "antd";
import { APPCONSTANTS, URL } from "../../../../../landing-page/src/constants";
import { Button } from "../../../../../landing-page/src/components";
import { Link } from "react-router-dom";
import {
	googleIcon,
	logo,
	student,
	woman,
} from "../../../../../landing-page/src/assets";
import {
	GoogleLogin,
	GoogleLoginResponse,
	GoogleLoginResponseOffline,
} from "react-google-login";

const Loginpage: React.FC<any> = () => {
	const responseGoogle = (
		response: GoogleLoginResponse | GoogleLoginResponseOffline
	) => {
		// Handle the response from Google login here
		console.log(response);
	};

	const onFailure = (error: any) => {
		// Handle errors here
		console.error("Google login failed:", error);
	};
	return (
		<div className="login">
			<Row style={{}}>
				{/* Desktop View */}
				<Col xs={{ span: 0 }} lg={{ span: 12 }}>
					<div className="first-container">
						<Link to={URL.HOME}>
							<img
								src={logo}
								alt="Login"
								style={{ maxWidth: "100%", maxHeight: "100%" }}
							/>
						</Link>

						<div className="main">
							<img src={student} alt="students studying" />
							<img src={woman} alt="graduating woman" />
						</div>
						<h2 className="inter-bold">Welcome Back!!</h2>
						<p className="inter-normal">Learn Anytime, Anywhere</p>
					</div>
				</Col>
				<Col xs={{ span: 24 }} lg={{ span: 12 }}>
					<div className="login-container" style={{}}>
						<Link to={URL.HOME} className="midlogo">
							<img
								src={logo}
								alt="Login"
								style={{ maxWidth: "100%", maxHeight: "100%" }}
							/>
						</Link>
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
							<GoogleLogin
								clientId="YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com" // Replace with your actual client ID
								buttonText="Login with Google"
								onSuccess={responseGoogle}
								onFailure={onFailure}
								cookiePolicy={"single_host_origin"}
								render={(renderProps) => (
									<AntDButton
										onClick={renderProps.onClick}
										block
										icon={<img src={googleIcon} alt="..." width={20} />}
										style={{
											backgroundColor: "#fff",
											color: "#000",
											margin: "auto",
											border: "1px solid #d9d9d9",
										}}
									>
										Google
									</AntDButton>
								)}
							/>
						</Form>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default Loginpage;
