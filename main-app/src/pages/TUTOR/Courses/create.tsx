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
		<Layout title="Courses">
			<div className="flex gap-2 my-[28px] items-start">
				<div className="w-1/2">
					<div>
						<h3 className="mb-[10px] text-[24px] font-semibold">
							Upload Course
						</h3>
						<p className="text-[#666666] text-[16px] w-full lg:w-[72%]">
							Make sure your course is catchy and descriptive as possible
						</p>
					</div>
				</div>
				<div className="w-1/2">
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
						<div className="flex gap-2 my-[26px] justify-end">
							<Button
								type="link"
								className="bg-[#581A57] p-3 px-8 !hover:bg-[#581A57] ml-[10px] text-[#fff] text-[14px] rounded-[8px]"
							>
								Next
							</Button>
						</div>
					</Form>
				</div>
			</div>
		</Layout>
	);
};

export default CreateCoursePage;
