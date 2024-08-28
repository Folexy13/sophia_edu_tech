import React, { useState, useEffect } from "react";
import Layout from "../../DashboardLayout";
import { Button, Form, Input, Select } from "antd";
import {
	applied_science_data,
	formal_science_data,
	humanities_data,
	natural_science_data,
	social_science_data,
} from "../../../utils/constants";
import { ArrowLeftOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";

const CreateCoursePage: React.FC = () => {
	const [form] = Form.useForm();
	const [moduleNumber, setModuleNumber] = useState<number>(1);
	const [category, setCategory] = useState<string>("");
	const [type, setType] = useState<string>("");
	const [step, setStep] = useState<number>(1);
	// const nav = useNavigate();
	useEffect(() => {
		const numberOfModules = form.getFieldValue("number_of_module");
		setModuleNumber(numberOfModules || 1);
	}, [form]);

	const handleValuesChange = () => {
		const numberOfModules = form.getFieldValue("number_of_module");
		setModuleNumber(numberOfModules || 1);
	};

	if (step === 1) {
		return (
			<Layout title="Courses">
				<div className="flex flex-col sm:flex-row gap-2 my-[28px] items-start">
					<div className="w-full sm:w-1/2">
						<div>
							<h3 className="mb-[10px] text-[24px] font-semibold">
								Upload Course
							</h3>
							<p className="text-[#666666] text-[16px] w-full lg:w-[72%]">
								Input your course details here
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
									onChange={(value: any) => {
										value === "Learning Development"
											? setCategory("learning")
											: setCategory("social");
									}}
								>
									<Select.Option value="Learning Development">
										Learning Development
									</Select.Option>
									<Select.Option value="Learning Career">
										Social Entrepreneurship and Innovation courses
									</Select.Option>
								</Select>
							</Form.Item>

							<Form.Item
								label="Course Type "
								className="inter-normal"
								name={"course_type"}
							>
								<Select
									placeholder="Select a Type"
									className="!p-[20px] inter-bold bg-[#fff] !text-black !outline-none !hover:border-none !border-none rounded-[6px]"
									onChange={(value) => {
										value == "Applied Science"
											? setType("applied_science_data")
											: value === "Formal Science"
											? setType("formal_science_data")
											: value === "Natural Science"
											? setType("natural_science_data")
											: value === "Social Science"
											? setType("social_science_data")
											: setType("humanities_data");
									}}
								>
									{category === "learning" ? (
										<>
											<Select.Option value="Applied Science">
												Applied Science
											</Select.Option>
											<Select.Option value="Formal Science">
												Formal Science
											</Select.Option>
											<Select.Option value="Humanities">
												Humanities
											</Select.Option>
											<Select.Option value="Natural Science">
												Natural Science
											</Select.Option>
											<Select.Option value="Social Science">
												Social Science
											</Select.Option>
										</>
									) : (
										<></>
									)}
								</Select>
							</Form.Item>
							<Form.Item
								label="Course Name"
								className="inter-normal"
								name={"course_type"}
							>
								<Select
									placeholder="Select a Type"
									className="!p-[20px] inter-bold bg-[#fff] !text-black !outline-none !hover:border-none !border-none rounded-[6px]"
									onChange={(value) => {
										value == "Applied Science"
											? setType("applied_science_data")
											: value === "Formal Science"
											? setType("formal_science_data")
											: value === "Natural Science"
											? setType("natural_science_data")
											: value === "Social Science"
											? setType("social_science_data")
											: setType("humanities_data");
									}}
								>
									{category === "learning" ? (
										<>
											<Select.Option value="Applied Science">
												Applied Science
											</Select.Option>
											<Select.Option value="Formal Science">
												Formal Science
											</Select.Option>
											<Select.Option value="Humanities">
												Humanities
											</Select.Option>
											<Select.Option value="Natural Science">
												Natural Science
											</Select.Option>
											<Select.Option value="Social Science">
												Social Science
											</Select.Option>
										</>
									) : (
										<></>
									)}
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
									{type === "applied_science_data"
										? applied_science_data.map((title) => {
												return (
													<Select.Option key={title}>{title}</Select.Option>
												);
										  })
										: type === "formal_science_data"
										? formal_science_data.map((title) => {
												return (
													<Select.Option key={title}>{title}</Select.Option>
												);
										  })
										: type === "natural_science_data"
										? natural_science_data.map((title) => {
												return (
													<Select.Option key={title}>{title}</Select.Option>
												);
										  })
										: type === "social_science_data"
										? social_science_data.map((title) => {
												return (
													<Select.Option key={title}>{title}</Select.Option>
												);
										  })
										: type === "humanities_data"
										? humanities_data.map((title) => {
												return (
													<Select.Option key={title}>{title}</Select.Option>
												);
										  })
										: ""}
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
									onClick={() => setStep(2)}
								>
									Next
								</Button>
							</div>
						</Form>
					</div>
				</div>
			</Layout>
		);
	} else {
		return (
			<Layout
				title={
					<>
						<ArrowLeftOutlined /> <span>Courses</span>
					</>
				}
				onclick={() => setStep(1)}
			>
				<div className="flex flex-col sm:flex-row gap-2 my-[28px] items-start">
					<div className="w-full sm:w-1/2">
						<div>
							<h3 className="mb-[10px] text-[24px] font-semibold">
								Upload Course Breakdown
							</h3>
							<p className="text-[#666666] text-[16px] w-full lg:w-[72%]">
								Make sure your course is catchy and descriptive as possible
							</p>
						</div>
					</div>
					<div className="w-full sm:w-1/2">
						<div className="bg-white text-center py-3 mb-4 text-[20px] inter-normal font-medium">
							Orientation
						</div>
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
									onChange={(value: any) => {
										value === "Learning Development"
											? setCategory("learning")
											: setCategory("social");
									}}
								>
									<Select.Option value="Learning Development">
										Learning Development
									</Select.Option>
									<Select.Option value="Learning Career">
										Social Entrepreneurship and Innovation courses
									</Select.Option>
								</Select>
							</Form.Item>
							<Form.Item
								label="Course Type "
								className="inter-normal"
								name={"course_type"}
							>
								<Select
									placeholder="Select a Type"
									className="!p-[20px] inter-bold bg-[#fff] !text-black !outline-none !hover:border-none !border-none rounded-[6px]"
									onChange={(value) => {
										value == "Applied Science"
											? setType("applied_science_data")
											: value === "Formal Science"
											? setType("formal_science_data")
											: value === "Natural Science"
											? setType("natural_science_data")
											: value === "Social Science"
											? setType("social_science_data")
											: setType("humanities_data");
									}}
								>
									{category === "learning" ? (
										<>
											<Select.Option value="Applied Science">
												Applied Science
											</Select.Option>
											<Select.Option value="Formal Science">
												Formal Science
											</Select.Option>
											<Select.Option value="Humanities">
												Humanities
											</Select.Option>
											<Select.Option value="Natural Science">
												Natural Science
											</Select.Option>
											<Select.Option value="Social Science">
												Social Science
											</Select.Option>
										</>
									) : (
										<></>
									)}
								</Select>
							</Form.Item>
							<Form.Item
								label="Course Name"
								className="inter-normal"
								name={"course_type"}
							>
								<Select
									placeholder="Select a Type"
									className="!p-[20px] inter-bold bg-[#fff] !text-black !outline-none !hover:border-none !border-none rounded-[6px]"
									onChange={(value) => {
										value == "Applied Science"
											? setType("applied_science_data")
											: value === "Formal Science"
											? setType("formal_science_data")
											: value === "Natural Science"
											? setType("natural_science_data")
											: value === "Social Science"
											? setType("social_science_data")
											: setType("humanities_data");
									}}
								>
									{category === "learning" ? (
										<>
											<Select.Option value="Applied Science">
												Applied Science
											</Select.Option>
											<Select.Option value="Formal Science">
												Formal Science
											</Select.Option>
											<Select.Option value="Humanities">
												Humanities
											</Select.Option>
											<Select.Option value="Natural Science">
												Natural Science
											</Select.Option>
											<Select.Option value="Social Science">
												Social Science
											</Select.Option>
										</>
									) : (
										<></>
									)}
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
									{type === "applied_science_data"
										? applied_science_data.map((title) => {
												return (
													<Select.Option key={title}>{title}</Select.Option>
												);
										  })
										: type === "formal_science_data"
										? formal_science_data.map((title) => {
												return (
													<Select.Option key={title}>{title}</Select.Option>
												);
										  })
										: type === "natural_science_data"
										? natural_science_data.map((title) => {
												return (
													<Select.Option key={title}>{title}</Select.Option>
												);
										  })
										: type === "social_science_data"
										? social_science_data.map((title) => {
												return (
													<Select.Option key={title}>{title}</Select.Option>
												);
										  })
										: type === "humanities_data"
										? humanities_data.map((title) => {
												return (
													<Select.Option key={title}>{title}</Select.Option>
												);
										  })
										: ""}
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
									className="bg-[#581A57] p-[20px] px-8 !hover:bg-[#581A57] ml-[10px] text-[#fff] text-[14px] rounded-[8px]"
								>
									Next
								</Button>
							</div>
						</Form>
					</div>
				</div>
			</Layout>
		);
	}
};

export default CreateCoursePage;
