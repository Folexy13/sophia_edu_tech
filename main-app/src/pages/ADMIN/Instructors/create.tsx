import React, { useState, useEffect } from "react";
import Layout from "../../DashboardLayout";
import { Button, Form, Input, Select } from "antd";

const CreateCoursePage: React.FC = () => {
	const [form] = Form.useForm();
	const [moduleNumber, setModuleNumber] = useState<number>(1);

	useEffect(() => {
		const numberOfModules = form.getFieldValue("number_of_module");
		setModuleNumber(numberOfModules || 1);
	}, [form]);

	const handleValuesChange = () => {
		const numberOfModules = form.getFieldValue("number_of_module");
		setModuleNumber(numberOfModules || 1);
	};

	return (
		<Layout title="Instructor" isAdmin>
			{/* Personal information secion */}
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
					<Form
						layout="vertical"
						form={form}
						onValuesChange={handleValuesChange}
						initialValues={{}}
					>
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
							name={"email_address"}
						>
							<Input
								placeholder="folajimiopeyemisax13@gmail.com"
								className="p-2"
							/>
						</Form.Item>
						<Form.Item
							label="Phone Number"
							className="inter-normal"
							name={"course_title"}
						>
							<Input placeholder="+443232424242" className="p-2" />
						</Form.Item>
					</Form>
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
					<Form
						layout="vertical"
						form={form}
						onValuesChange={handleValuesChange}
						initialValues={{ number_of_module: 1 }}
					>
						<Form.Item
							label="Course Category"
							className="inter-normal"
							name={"course_category"}
						>
							<Select
								placeholder="Select a Category"
								className="!p-[20px] inter-bold bg-[#fff] !text-black !outline-none !hover:border-none !border-none rounded-[6px]"
							>
								<Select.Option value="Learning Development">
									Learning Development
								</Select.Option>
								<Select.Option value="Learning Career">
									Learning Career
								</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item
							label="Course Type / Name"
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
						<Form.Item
							label="Brief about the course"
							className="inter-normal"
							name={"course_briefing"}
						>
							<Input.TextArea
								className="p-2"
								placeholder="Write a short descr. about course"
							/>
						</Form.Item>
						<Form.Item
							label="Number of Modules"
							className="inter-normal"
							name={"number_of_module"}
						>
							<Select
								defaultValue={1}
								className="!p-[20px] inter-bold bg-[#fff] !text-black !outline-none !hover:border-none !border-none rounded-[6px]"
							>
								<Select.Option value={1}>1</Select.Option>
								<Select.Option value={2}>2</Select.Option>
								<Select.Option value={3}>3</Select.Option>
								<Select.Option value={4}>4</Select.Option>
								<Select.Option value={5}>5</Select.Option>
								<Select.Option value={"5 + Apply & Conclusion"}>
									5 + Apply & Conclusion
								</Select.Option>
							</Select>
						</Form.Item>
						{Array.from({ length: moduleNumber }, (_, i) => (
							<Form.Item
								label={`Module ${i + 1}`}
								key={i}
								className="inter-normal"
								name={`module_${i + 1}_title`}
							>
								<Input
									className="p-[12px]"
									placeholder={`Write a short description (max word of 200)`}
								/>
							</Form.Item>
						))}
						<Form.Item className="w-full ml-auto justify-end flex">
							<Button className="bg-[#DBDBDB] text-[#3A3A3A] text-[14px] rounded-[8px]">
								Delete
							</Button>
							<Button className="bg-[#3A3A3A] ml-[10px] text-[#fff] text-[14px] rounded-[8px]">
								Add More
							</Button>
						</Form.Item>
					</Form>
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
					<Form
						layout="vertical"
						form={form}
						onValuesChange={handleValuesChange}
						initialValues={{}}
					>
						<Form.Item
							label="Password"
							className="inter-normal"
							name={"full_name"}
						>
							<Input placeholder="**********" type="password" className="p-2" />
						</Form.Item>
						<Button
							htmlType="submit"
							block
							loading={false}
							disabled={false}
							className="my-[15px] p-[10px] text-white bg-[#581A57]"
						>
							Send email
						</Button>
					</Form>
				</div>
			</div>
		</Layout>
	);
};

export default CreateCoursePage;
