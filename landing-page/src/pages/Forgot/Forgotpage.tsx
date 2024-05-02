import React from "react";
import "./Forgotpage.styles.scss";
import { Col, Form, Input, Row } from "antd";
import { Button } from "../../components";
import { logo, student, woman } from "../../assets";

const Forgotpage: React.FC<any> = () => {
	return (
		<div className="forgot">
			<Row style={{}}>
				{/* Desktop View */}
				<Col xs={{ span: 0 }} lg={{ span: 12 }}>
					<div className="first-container">
						<img
							src={logo}
							alt="forgot"
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
					<div className="forgot-container" style={{}}>
						<h2>Forgot password</h2>
						<p className="inter-normal">
							Enter email address to recieve mail from us
						</p>
						<Form layout="vertical">
							<Form.Item label="Email address" className="inter-normal">
								<Input />
							</Form.Item>

							<Form.Item className="inter-normal">
								<Button height={50} width={"100%"}>
									Send email
								</Button>
							</Form.Item>
						</Form>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default Forgotpage;
