import React, { useState, useEffect } from "react";
import Layout from "../../DashboardLayout";
import {
	Button,
	Form,
	Input,
	Select,
	Upload as AntDUpload,
	UploadProps,
	message,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { UploadIcon } from "../../../assets";

const CreateCoursePage: React.FC = () => {
	const [form] = Form.useForm();
	const [moduleNumber, setModuleNumber] = useState<number>(1);
	const nav = useNavigate();
	useEffect(() => {
		const numberOfModules = form.getFieldValue("number_of_module");
		setModuleNumber(numberOfModules || 1);
	}, [form]);

	const handleValuesChange = () => {
		const numberOfModules = form.getFieldValue("number_of_module");
		setModuleNumber(numberOfModules || 1);
	};
	const { Dragger } = AntDUpload;
	const props: UploadProps = {
		name: "file",
		multiple: true,
		action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
		onChange(info) {
			const { status } = info.file;
			if (status !== "uploading") {
				console.log(info.file, info.fileList);
			}
			if (status === "done") {
				message.success(`${info.file.name} file uploaded successfully.`);
			} else if (status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		onDrop(e) {
			console.log("Dropped files", e.dataTransfer.files);
		},
	};
	return (
		<Layout
			title={
				<>
					<ArrowLeftOutlined /> <span>Blog</span>
				</>
			}
			onclick={() => nav(-1)}
			isAdmin
		>
			{/* Personal information secion */}
			<div className="flex flex-col sm:flex-row gap-2 my-[28px] items-start">
				<div className="w-full sm:w-1/2">
					<div>
						<h3 className="mb-[10px] text-[24px] font-semibold">
							Create a Post
						</h3>
						<p className="text-[#666666] text-[16px] w-full lg:w-[72%]">
							You can create your blog post here
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
							label="Heading"
							className="inter-normal"
							name={"heading"}
						>
							<Input placeholder="Lorem ipsum..." className="p-2" />
						</Form.Item>
						<Form.Item
							label="Subheading"
							className="inter-normal"
							name={"sub_heading"}
						>
							<Select
								placeholder="Select a Category"
								className="!p-[20px] inter-bold bg-[#fff] !text-black !outline-none !hover:border-none !border-none rounded-[6px]"
							>
								<Select.Option value="History">History</Select.Option>
								<Select.Option value="Education">Education</Select.Option>
								<Select.Option value="Agriculture">Agriculture</Select.Option>
								<Select.Option value="Technology">Technology</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item label="Body" className="inter-normal" name={"body"}>
							<Input.TextArea placeholder="message" className="p-2" />
						</Form.Item>
						<Form.Item label="Upload Image">
							<Dragger {...props}>
								<p className="ant-upload-drag-icon flex justify-center">
									<UploadIcon />
								</p>
								<p className="ant-upload-hint">
									(max file size: 200mb - pdf,docx,ppt,xl)
								</p>
							</Dragger>
						</Form.Item>
						<Form.Item
							label="Mins of read"
							className="inter-normal"
							name={"mins_of_read"}
						>
							<Input placeholder="2" className="p-2" type="number" />
						</Form.Item>
						<Form.Item
							label="Name of author"
							className="inter-normal"
							name={"name_of_author"}
						>
							<Input placeholder="Aluko Folajimi" className="p-2" />
						</Form.Item>
						<Button
							htmlType="submit"
							block
							loading={false}
							disabled={false}
							className="my-[15px] p-[10px] text-white bg-[#581A57]"
						>
							Publish
						</Button>
					</Form>
				</div>
			</div>
		</Layout>
	);
};

export default CreateCoursePage;
