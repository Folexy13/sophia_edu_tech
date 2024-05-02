import React from "react";
import "./Registerpage.styles.scss";
import { Col, Form, Input, Row } from "antd";
import { Button } from "../../components";
import { Link } from "react-router-dom";
import { logo, student, woman } from "../../assets";
import { URL } from "../../constants";

const Registerpage: React.FC<any> = () => {
	return (
		<div className="register">
			<Row style={{}}>
				{/* Desktop View */}
				<Col xs={{ span: 0 }} lg={{ span: 12 }}>
					<div className="first-container">
						<img
							src={logo}
							alt="regsister"
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
					<div className="register-container" style={{}}>
						<h2>Become a member</h2>
						<p className="inter-normal">
							Enter email address and password to register
						</p>
						<Form layout="vertical">
							<Form.Item label="Full name" className="inter-normal">
								<Input />
							</Form.Item>
							<Form.Item label="Email address" className="inter-normal">
								<Input />
							</Form.Item>
							<Form.Item label="Password" className="inter-normal">
								<Input.Password />
							</Form.Item>
							<Form.Item label="Confirm password" className="inter-normal">
								<Input.Password />
							</Form.Item>

							<Form.Item className="inter-normal">
								<Button height={50} width={"100%"}>
									Create Account
								</Button>
							</Form.Item>
							<Form.Item
								className="inter-normal"
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
						</Form>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default Registerpage;
