import React, { useState } from "react";
import Layout from "../../Layout";
import { Form, Input } from "antd";
import { Button } from "../../../components";
import { useNavigate } from "react-router-dom";

const Generate: React.FC<any> = () => {
	const [loading, setLoading] = useState(false);
	const nav = useNavigate();

	const handleSubmit = (value: any) => {
		if (value) setLoading(true);
		console.log(value);
		setTimeout(() => {
			setLoading(false);
			nav("/new/certificate", { state: value });
		}, 2000);
	};

	return (
		<Layout>
			<div className="w-[90%] sm:w-3/5 mx-auto">
				<h2 className="text-[24px] sm:text-center my-[20px] font-semibold">
					Generate Certificate
				</h2>
				<p className="text-[16px] sm:text-center mb-[20px]">
					Publish your work from the learning development course and generate a
					certificate of achievement.
				</p>

				<Form
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					onFinish={handleSubmit}
				>
					<Form.Item
						label="Course"
						name="course"
						rules={[
							{
								required: true,
								message: "Please enter the course name",
							},
							{
								min: 3,
								message: "Course name must be at least 3 characters long",
							},
						]}
					>
						<Input
							className="p-2"
							placeholder="Type three words of the learning development course"
						/>
					</Form.Item>

					<Form.Item
						label="Publication Title"
						name="publication_title"
						rules={[
							{
								required: true,
								message: "Please enter your publication title",
							},
						]}
					>
						<Input className="p-2" placeholder="Enter your publication title" />
					</Form.Item>

					<Form.Item
						label="Publication Name"
						name="publication_name"
						rules={[
							{
								required: true,
								message: "Please enter your publication name",
							},
						]}
					>
						<Input className="p-2" placeholder="Enter your publication name" />
					</Form.Item>

					<Form.Item
						label="DOI"
						name="doi"
						rules={[
							{
								required: true,
								message: "Please enter the DOI of your publication",
							},
							// {
							// 	pattern: /^10.\d{4,9}\/[-._;()/:A-Z0-9]+$/i,
							// 	message: "Please enter a valid DOI format",
							// },
						]}
					>
						<Input
							className="p-2"
							placeholder="Enter DOI of your publication"
						/>
					</Form.Item>

					<div style={{ marginTop: "20px", textAlign: "right" }}>
						<Button
							label={"Generate"}
							loading={loading}
							htmlType={"submit"}
							className="mr-[10px] p-[20px] w-[200px] hover:!bg-[#581A57] focus:!bg-[#581A57] bg-[#581A57] hover:!text-white focus:!text-white text-white mb-[80px]"
						/>
					</div>
				</Form>
			</div>
		</Layout>
	);
};

export default Generate;
