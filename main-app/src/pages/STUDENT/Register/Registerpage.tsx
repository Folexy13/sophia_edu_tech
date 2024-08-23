import React, { useState } from "react";
import "./Registerpage.styles.scss";
import { Col, Form, Input, Row, Button as AntDButton, FormProps } from "antd";
import { Link, useNavigate } from "react-router-dom";

// import {
// 	GoogleLogin,
// 	GoogleLoginResponse,
// 	GoogleLoginResponseOffline,
// } from "react-google-login";
import { AuthRequest } from "../../../requests";
import { useAlert } from "../../../store";
import { URL } from "../../../utils/constants";
import { Logo, student, woman } from "../../../assets";
type FieldType = {
	full_name?: string;
	email?: string;
	password?: string;
	confirm_password?: string;
};
const Registerpage: React.FC<any> = () => {
	// const responseGoogle = (
	// 	response: GoogleLoginResponse | GoogleLoginResponseOffline
	// ) => {
	// 	// Handle the response from Google login here
	// 	console.log(response);
	// };
	const nav = useNavigate();
	const [loading, setLoading] = useState(false);
	const { onFailure: AlertFailure, onSuccess } = useAlert(); // Assuming useAlert handles success and failure alerts

	// const onFailure = (error: any) => {
	// 	// Handle errors here
	// 	console.error("Google login failed:", error);
	// };
	const onFinish: FormProps<FieldType>["onFinish"] = async (values: any) => {
		setLoading(true);
		try {
			const res = await AuthRequest.register(values); // Assuming AuthRequest returns a promise
			console.log(res); // Log response if needed
			onSuccess("Registration successful!"); // Trigger success alert
			nav(URL.LOGIN);
		} catch (error: any) {
			console.error("Registration error:", error);
			AlertFailure(error.message); // Trigger failure alert
		} finally {
			setLoading(false);
		}
	};
	const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
		errorInfo: any
	) => {
		console.log("Failed:", errorInfo);
	};
	return (
		<div className="register">
			<Row style={{}}>
				{/* Desktop View */}
				<Col xs={{ span: 0 }} lg={{ span: 12 }}>
					<div className="first-container">
						<Link to={URL.HOME}>
							<img
								src={Logo}
								alt="Login"
								style={{ maxWidth: "100%", maxHeight: "100%" }}
							/>
						</Link>
						<div className="main w-full xl:w-[780px]">
							<img src={student} alt="students studying" />

							<img
								src={woman}
								alt="graduating woman"
								className="right-[1rem] xl:right-[15rem] bottom-[2rem]"
							/>
						</div>
						<h2 className="inter-bold">Join Our Learning Community!!</h2>
						<p className="inter-normal">
							Unlock Unlimited Learning Opportunities
						</p>
					</div>
				</Col>
				<Col xs={{ span: 24 }} lg={{ span: 12 }}>
					<div className="register-container" style={{}}>
						<Link to={URL.HOME} className="midlogo">
							<img
								src={Logo}
								alt="Login"
								style={{ maxWidth: "100%", maxHeight: "100%" }}
							/>
						</Link>
						<h2>Become a member</h2>
						<p className="inter-normal">
							Enter email address and password to register
						</p>
						<Form
							layout="vertical"
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							// autoComplete="off"
						>
							<Form.Item
								label="Full name"
								name="full_name"
								className="inter-normal"
							>
								<Input />
							</Form.Item>
							<Form.Item
								label="Email address"
								name="email"
								className="inter-normal"
							>
								<Input />
							</Form.Item>
							<Form.Item
								label="Password"
								name="password"
								className="inter-normal"
							>
								<Input.Password />
							</Form.Item>
							<Form.Item
								label="Confirm password"
								name="confirm_password"
								className="inter-normal"
							>
								<Input.Password />
							</Form.Item>

							<Form.Item className="inter-normal">
								<AntDButton
									className="h-[50px] w-full bg-[#581A57] text-white p-5 hover:"
									loading={loading}
									htmlType="submit"
								>
									Create Account
								</AntDButton>
							</Form.Item>
							<Form.Item
								className="font-inter text-[16px] leading-[19.36px]"
								style={{ textAlign: "center" }}
							>
								Already have an account?{" "}
								<Link
									to={URL.LOGIN}
									className="inter-bold"
									style={{ color: "#581A57" }}
								>
									Login
								</Link>
							</Form.Item>
							<Form.Item>
								<div className="option">
									<span className="line"></span>
									<p style={{ marginTop: 30 }}>or</p>
									<span className="line"></span>
								</div>
							</Form.Item>
							{/* <GoogleLogin
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
							/> */}
						</Form>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default Registerpage;
