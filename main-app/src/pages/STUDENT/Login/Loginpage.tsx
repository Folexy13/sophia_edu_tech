import React, { useState } from "react";
import "./Loginpage.styles.scss";
import {
	Col,
	Form,
	Input,
	Row,
	Button as AntDButton,
	FormProps,
	Checkbox,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Logo, student, woman } from "../../../assets";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { AuthRequest } from "../../../requests";
import { useAlert, useAuth } from "../../../store";
import { setStoredAuthToken } from "../../../utils/storage";
import { APPCONSTANTS, URL } from "../../../utils/constants";
type FieldType = {
	email?: string;
	password?: string;
	remember?: string;
};

const Loginpage: React.FC<any> = () => {
	const [loading, setLoading] = useState(false);
	const { onFailure: AlertFailure, onSuccess } = useAlert(); // Assuming useAlert handles success and failure alerts
	const { onLogin } = useAuth();
	const nav = useNavigate();
	// const responseGoogle = (

	const onFinish: FormProps<FieldType>["onFinish"] = async (values: any) => {
		setLoading(true);
		try {
			const res: any = await AuthRequest.login(values); // Assuming AuthRequest returns a promise
			console.log(res); // Log response if needed
			onSuccess("Login successful!"); // Trigger success alert
			onLogin(res?.access_token);
			setStoredAuthToken(res?.access_token, "student");
			nav(URL.HOME);
		} catch (error: any) {
			console.error("Login error:", error);
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
	// const onFailure = (error: any) => {
	// 	// Handle errors here
	// 	console.error("Google login failed:", error);
	// };
	return (
		<div className="student_login">
			<Row style={{}}>
				{/* Desktop View */}
				<Col xs={{ span: 0 }} lg={{ span: 12 }}>
					<div className="first-container">
						<Link to={URL.HOME}>
							<img
								src={Logo}
								alt="logo"
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
						<h2 className="inter-bold">Welcome Back!!</h2>
						<p className="inter-normal">Learn Anytime, Anywhere</p>
					</div>
				</Col>
				<Col xs={{ span: 24 }} lg={{ span: 12 }}>
					<div className="login-container" style={{}}>
						<Link to={URL.HOME} className="midlogo">
							<img
								src={Logo}
								alt="Login"
								style={{ maxWidth: "100%", maxHeight: "100%" }}
							/>
						</Link>
						<h2>Login</h2>
						<p className="inter-normal">
							Enter email address and password to login
						</p>
						<Form
							layout="vertical"
							initialValues={{ remember: true }}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							// autoComplete="off"
						>
							<Form.Item
								label="Email address"
								className="inter-normal"
								name={"email"}
							>
								<Input />
							</Form.Item>
							<Form.Item
								label="Password"
								className="inter-normal"
								name={"password"}
							>
								<Input.Password />
							</Form.Item>
							<div className="flex justify-end">
								<Form.Item className="inter-bold">
									<Link
										to={URL.FORGOT_PASSWORD}
										style={{
											color: APPCONSTANTS.APP_DARK_PURPLE,
											float: "right",
										}}
										className="font-inter"
									>
										Forgot password?
									</Link>
								</Form.Item>
							</div>
							<Form.Item
								name="agree"
								valuePropName="checked"
								rules={[
									{
										validator: (_, value) =>
											value
												? Promise.resolve()
												: Promise.reject(
														new Error(
															"You must agree to the terms and conditions"
														)
												  ),
									},
								]}
							>
								<Checkbox>
									I agree to the{" "}
									<a
										target="_blank"
										href="https://sophia-landing.netlify.app/terms-of-use/"
										className="font-inter text-[#581a57] font-semibold"
									>
										terms and conditions
									</a>
								</Checkbox>
							</Form.Item>
							<Form.Item className="inter-normal">
								<AntDButton
									loading={loading}
									htmlType="submit"
									disabled={loading}
									className="h-[50px] w-full !bg-[#581A57]  !text-white p-5 hover:"
								>
									Log in
								</AntDButton>
							</Form.Item>
							<Form.Item
								className="font-inter text-[16px] leading-[19.36px]"
								style={{ textAlign: "center" }}
							>
								Don't have an account?{" "}
								<Link
									to={URL.REGISTER}
									className="font-inter font-medium"
									style={{ color: "#581A57" }}
								>
									Become a member
								</Link>
							</Form.Item>
							<Form.Item>
								<div className="option">
									<span className="line"></span>
									<p className="mt-[11px] sm:mt-[30px]">or</p>
									<span className="line"></span>
								</div>
							</Form.Item>
							<GoogleOAuthProvider clientId="721301716315-o03cg1fbq3kj16730r309rq850n8v29h.apps.googleusercontent.com">
								<GoogleLogin
									useOneTap
									onSuccess={(credentialResponse) => {
										console.log(credentialResponse);
									}}
									onError={() => {
										console.log("Login Failed");
									}}
								/>
							</GoogleOAuthProvider>
							{/* <GoogleLogin
								clientId="721301716315-o03cg1fbq3kj16730r309rq850n8v29h.apps.googleusercontent.com" // Replace with your actual client ID
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

export default Loginpage;
