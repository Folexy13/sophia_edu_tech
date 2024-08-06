import React, { useState } from "react";
import Layout from "../../Layout";
import { Form, Input } from "antd";
import { Button } from "../../../components";

const Generate: React.FC<any> = () => {
	const [loading, setLoading] = useState(false);
	const handleSubmit = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
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

				<Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
					<Form.Item label="Course">
						<Input
							name="course"
							className="p-2"
							placeholder="Type three words of the learning development course"
						/>
					</Form.Item>
					<Form.Item label="Publication Title">
						<Input
							name="publication_title"
							className="p-2"
							placeholder="Enter your publication title"
						/>
					</Form.Item>
					<Form.Item label="Publication Name">
						<Input
							name="publication_name"
							className="p-2"
							placeholder="Enter your publication name"
						/>
					</Form.Item>
					<Form.Item label="DOI">
						<Input
							name="doi"
							className="p-2"
							placeholder="Enter DOI of your publication"
						/>
					</Form.Item>
					<div style={{ marginTop: "20px", textAlign: "right" }}>
						<Button
							label={"Generate"}
							loading={loading}
							onclick={handleSubmit}
							className="mr-[10px] p-[20px] w-[200px] hover:!bg-[#581A57] focus:!bg-[#581A57] bg-[#581A57] hover:!text-white focus:!text-white text-white mb-[80px]"
						/>
					</div>
				</Form>
			</div>
		</Layout>
	);
};

export default Generate;
