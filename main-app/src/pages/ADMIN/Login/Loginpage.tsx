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
import { googleIcon, Logo, student, woman } from "../../../assets";
import {
	GoogleLogin,
	GoogleLoginResponse,
	GoogleLoginResponseOffline,
} from "react-google-login";
import { AuthRequest } from "../../../requests";
import { useAlert, useAuth } from "../../../store";
import { setStoredAuthToken } from "../../../utils/storage";
import { APPCONSTANTS, URL } from "../../../utils/constants";
type FieldType = {
	username?: string;
	password?: string;
	remember?: string;
};

const Loginpage: React.FC<any> = () => {
	const [loading, setLoading] = useState(false);
	const { onFailure: AlertFailure, onSuccess } = useAlert(); // Assuming useAlert handles success and failure alerts
	const { onLogin } = useAuth();
	const nav = useNavigate();
	const responseGoogle = (
		response: GoogleLoginResponse | GoogleLoginResponseOffline
	) => {
		// Handle the response from Google login here
		console.log(response);
	};

	const onFinish: FormProps<FieldType>["onFinish"] = async (values: any) => {
		setLoading(true);
		try {
			const res: any = await AuthRequest.adminLogin(values); // Assuming AuthRequest returns a promise
			console.log(res); // Log response if needed
			onSuccess("Login successful!"); // Trigger success alert
			onLogin(res?.access_token);
			setStoredAuthToken(res?.access_token, "admin");
			nav(URL.ADMIN_OVERVIEW);
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
								src={Logo}
								alt="logo"
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
								label="Username"
								className="inter-normal"
								name={"username"}
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
							<div className="flex justify-between">
								<Form.Item<FieldType>
									name="remember"
									valuePropName="checked"
									// wrapperCol={{ offset: 8, span: 16 }}
								>
									<Checkbox>Remember me</Checkbox>
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
							</div>

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
