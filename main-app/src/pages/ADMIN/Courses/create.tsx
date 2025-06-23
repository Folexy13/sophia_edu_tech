import React, { useState } from "react";
import Layout from "../../DashboardLayout";
import { Button, Form, FormProps, Input, Select } from "antd";
import { AdminRequest } from "../../../requests";
import { useAlert } from "../../../store";
import { useCourseData } from "../../../utils/hooks/useCourseData";
import { useNavigate } from "react-router-dom";

type FieldType = {
	course_name?: string;
	course_type?: string;
	course_title?: string;
	price?: string;
	number_of_modules?: number;
};

const CreateCoursePage: React.FC = () => {
	const [form] = Form.useForm();	const [loading, setLoading] = useState(false);
	const { onFailure: AlertFailure, onSuccess } = useAlert();
	const nav = useNavigate();
	const { getCourseCategories } = useCourseData();
	const [selectedCategory, setSelectedCategory] = useState('');
	const [courseTitles, setCourseTitles] = useState<string[]>(['']); // Array to store multiple course titles
	
	const getCourseData = (values: any) => {
		const { course_name, course_type, price, number_of_modules } = values;
		
		return {
			course_category: selectedCategory,
			course_type,
			course_name,
			course_title: courseTitles.filter(title => title.trim()).join(', '), // Join multiple titles
			price: price ? parseFloat(price) : null,
			number_of_modules: number_of_modules ? parseInt(number_of_modules) : 0,
		};
	}

	const onFinish: FormProps<FieldType>["onFinish"] = async (values: any) => {
		let courseData = getCourseData(values);

		setLoading(true);
		try {
			await AdminRequest.createCourse(courseData);
			onSuccess("Course created successfully!");
			form.resetFields();
			nav("/admin/courses");
		} catch (error: any) {
			console.error("Creation error:", error);
			AlertFailure(error.message);
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
		<Layout title="Create Course" isAdmin>
			<Form
				layout="vertical"
				form={form}
				onFinish={onFinish}
				initialValues={{}}
				onFinishFailed={onFinishFailed}
				className="p-4 sm:p-0"
			>
				<div className="flex flex-col sm:flex-row gap-2 my-[28px] items-start">
					<div className="w-full sm:w-1/2">
						<div>
							<h3 className="mb-[10px] text-[24px] font-semibold">
								Course Information
							</h3>
							<p className="text-[#666666] text-[16px] w-full lg:w-[72%]">
								This section contains course details
							</p>
						</div>
					</div>
					<div className="w-full sm:w-1/2">
						<Form.Item label="Course Category" name="course_category" className="inter-normal">
							<Select
								placeholder="Select a Category"
								className="!p-[20px] inter-bold bg-[#fff] !text-black !outline-none !hover:border-none !border-none rounded-[6px]"
								onChange={(value) => setSelectedCategory(value)}
							>
								{
									getCourseCategories().map((category) => (
										<Select.Option key={category} value={category}>
											{category}
										</Select.Option>
									))
								}
							</Select>
						</Form.Item>
						<Form.Item label="Course Type" name="course_type" className="inter-normal">
							<Input placeholder="Enter course type" className="p-2" />
						</Form.Item>
						<Form.Item label="Course Name" name="course_name" className="inter-normal">
							<Input placeholder="Enter course name" className="p-2" />
						</Form.Item>						<Form.Item label="Course Title" className="mb-0">
							<div className="flex justify-between items-center">
								<span className="text-[#666666]">Add Course Titles</span>
								<Button 
									className="text-[#581A57]" 
									type="link" 
									onClick={() => setCourseTitles([...courseTitles, ''])}
								>
									+ Add Title
								</Button>
							</div>
						</Form.Item>
						{courseTitles.map((title, index) => (
							<Form.Item 
								key={index}
								className="inter-normal mb-2"
							>
								<div className="flex items-center">
									<Input 
										placeholder={`Enter title ${index + 1}`} 
										className="p-2" 
										value={title}
										onChange={(e) => {
											const newTitles = [...courseTitles];
											newTitles[index] = e.target.value;
											setCourseTitles(newTitles);
										}}
									/>
									{courseTitles.length > 1 && (
										<Button 
											className="ml-2 text-red-500" 
											type="link"
											onClick={() => {
												const newTitles = courseTitles.filter((_, i) => i !== index);
												setCourseTitles(newTitles);
											}}
										>
											Remove
										</Button>
									)}
								</div>
							</Form.Item>
						))}
						
						<Form.Item label="Amount" className="inter-normal" name="price">
							<Input className="p-2" type="number" placeholder="Enter amount"/>
						</Form.Item>

						<Form.Item label="Number of Modules" className="inter-normal" name="number_of_modules">
							<Input className="p-2" type="number" placeholder="Enter number of modules"/>
						</Form.Item>

						<Button
							block
							loading={loading}
							htmlType="submit"
							disabled={loading}
							className="my-[15px] p-[20px] text-white bg-[#581A57]"
						>
							Create Course
						</Button>
					</div>
				</div>
			</Form>
		</Layout>
	);
};

export default CreateCoursePage;
