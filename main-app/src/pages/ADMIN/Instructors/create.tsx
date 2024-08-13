import React, { useState } from "react";
import Layout from "../../DashboardLayout";

import { Button, Form, FormProps, Input, Select } from "antd";
import { AdminRequest } from "../../../requests";
import { useAlert } from "../../../store";
import { useLocation } from "react-router-dom";
type FieldType = {
	email?: string;
	password?: string;
	remember?: string;
};
const CreateCoursePage: React.FC = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const { onFailure: AlertFailure, onSuccess } = useAlert();
	const { state } = useLocation();
	// const { user } = state;
	console.log(state);
	const onFinish: FormProps<FieldType>["onFinish"] = async (values: any) => {
		setLoading(true);
		try {
			const res: any = await AdminRequest.createInstructor(values); // Assuming AuthRequest returns a promise
			console.log(res); // Log response if needed
			onSuccess("Instructor created successfully!");
			form.resetFields();
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

	return (
		<Layout title="Instructor" isAdmin>
			{/* Personal information secion */}
			<Form
				layout="vertical"
				form={form}
				onFinish={onFinish}
				// onValuesChange={}
				initialValues={{}}
				onFinishFailed={onFinishFailed}
				className="p-4 sm:p-0"
			>
				<div className="flex flex-col sm:flex-row gap-2 my-[28px] items-start">
					<div className="w-full sm:w-1/2">
						<div>
							<h3 className="mb-[10px] text-[24px] font-semibold">
								Personal Information
							</h3>
							<p className="text-[#666666] text-[16px] w-full lg:w-[72%]">
								This section contains instructor details like name,phone etc.
							</p>
						</div>
					</div>
					<div className="w-full sm:w-1/2">
						<Form.Item
							label="Full Name"
							className="inter-normal"
							name={"full_name"}
						>
							<Input placeholder="Aluko Opeyemi" className="p-2" />
						</Form.Item>
						<Form.Item
							label="Email Address"
							className="inter-normal"
							name={"email"}
						>
							<Input
								placeholder="folajimiopeyemisax13@gmail.com"
								className="p-2"
							/>
						</Form.Item>
						<Form.Item
							label="Phone Number"
							className="inter-normal"
							name={"phone"}
						>
							<Input placeholder="+443232424242" className="p-2" />
						</Form.Item>
					</div>
				</div>

				{/* Assign courses section */}
				<div className="flex flex-col sm:flex-row gap-2 my-[28px] items-start">
					<div className="w-full sm:w-1/2">
						<div>
							<h3 className="mb-[10px] text-[24px] font-semibold">
								Assign Course
							</h3>
							<p className="text-[#666666] text-[16px] w-full lg:w-[72%]">
								Attach a course to the instructor
							</p>
						</div>
					</div>
					<div className="w-full sm:w-1/2">
						<Form.Item
							label="Course Category"
							className="inter-normal"
							name={"course"}
						>
							<Select
								placeholder="Select a Category"
								className="!p-[20px] inter-bold bg-[#fff] !text-black !outline-none !hover:border-none !border-none rounded-[6px]"
							>
								<Select.Option value="Learning Development">
									Learning Development
								</Select.Option>
								<Select.Option value="Social Entrepreneurship and Innovation">
									Social Entrepreneurship and Innovation
								</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item
							label="Course Type"
							className="inter-normal"
							name={"course_type"}
						>
							<Select
								placeholder="Select a Type"
								className="!p-[20px] inter-bold bg-[#fff] !text-black !outline-none !hover:border-none !border-none rounded-[6px]"
							>
								<Select.Option value="Agriculture">Agriculture</Select.Option>
								<Select.Option value="Engineering">Engineering</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item
							label="Course Title"
							className="inter-normal"
							name={"course_title"}
						>
							<Select
								placeholder="Select a Title"
								className="!p-[20px] inter-bold bg-[#fff] !text-black !outline-none !hover:border-none !border-none rounded-[6px]"
							>
								<Select.Option value="Agriculture">Agriculture</Select.Option>
								<Select.Option value="Engineering">Engineering</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item label="Amount" className="inter-normal" name={"amount"}>
							<Input className="p-2" />
						</Form.Item>
						<Form.Item className="w-full ml-auto justify-end flex">
							<Button className="bg-[#DBDBDB] text-[#3A3A3A] text-[14px] rounded-[8px]">
								Delete
							</Button>
							<Button className="bg-[#3A3A3A] ml-[10px] text-[#fff] text-[14px] rounded-[8px]">
								Add More
							</Button>
						</Form.Item>
					</div>
				</div>

				{/* Create Password section */}
				<div className="flex flex-col sm:flex-row gap-2 my-[28px] items-start">
					<div className="w-full sm:w-1/2">
						<div>
							<h3 className="mb-[10px] text-[24px] font-semibold">
								Create Password
							</h3>
							<p className="text-[#666666] text-[16px] w-full lg:w-[72%]">
								Create Password for instructor
							</p>
						</div>
					</div>
					<div className="w-full sm:w-1/2">
						<Form.Item
							label="Password"
							className="inter-normal"
							name={"password"}
						>
							<Input placeholder="**********" type="password" className="p-2" />
						</Form.Item>
						<Button
							block
							loading={loading}
							htmlType="submit"
							disabled={loading}
							className="my-[15px] p-[20px] text-white bg-[#581A57]"
						>
							Send email
						</Button>
					</div>
				</div>
			</Form>
		</Layout>
	);
};

export default CreateCoursePage;
