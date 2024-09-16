import React, { useState, useEffect } from "react";
import Layout from "../../DashboardLayout";
import {
	Button,
	Form,
	Input,
	Upload as AntDUpload,
	UploadProps,
	message,
	Select,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { UploadIcon } from "../../../assets";
import adminRequests from "../../../requests/admin.request";
import { uploadImageToCloudinary } from "../../../utils/helperFunction";
import { RcFile } from "antd/es/upload";

const CreateBlogPage: React.FC = () => {
	const [form] = Form.useForm();
	const [_, setModuleNumber] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(false);
	const nav = useNavigate();
	const [uploadedImageUrl, setUploadedImageUrl] = useState<any>(null); // Track uploaded image
	useEffect(() => {
		const numberOfModules = form.getFieldValue("number_of_module");
		setModuleNumber(numberOfModules || 1);
	}, [form]);

	const handleValuesChange = () => {
		const numberOfModules = form.getFieldValue("number_of_module");
		setModuleNumber(numberOfModules || 1);
	};
	const { Dragger } = AntDUpload;
	// const props: UploadProps = {
	// 	name: "file",
	// 	multiple: true,
	// 	action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
	// 	onChange(info) {
	// 		const { status } = info.file;
	// 		if (status !== "uploading") {
	// 			console.log(info.file, info.fileList);
	// 		}
	// 		if (status === "done") {
	// 			message.success(`${info.file.name} file uploaded successfully.`);
	// 		} else if (status === "error") {
	// 			message.error(`${info.file.name} file upload failed.`);
	// 		}
	// 	},
	// 	onDrop(e) {
	// 		console.log("Dropped files", e.dataTransfer.files);
	// 	},
	// };
	// Uploader props
	// const props: UploadProps = {
	// 	name: "file",
	// 	multiple: false, // Only upload one image at a time
	// 	action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
	// 	onChange(info) {
	// 		const { status } = info.file;
	// 		if (status !== "uploading") {
	// 			console.log(info.file, info.fileList);
	// 		}
	// 		if (status === "done") {
	// 			message.success(`${info.file.name} file uploaded successfully.`);
	// 			setUploadedImage(info.fileList); // Store the uploaded file object
	// 		} else if (status === "error") {
	// 			message.error(`${info.file.name} file upload failed.`);
	// 			setUploadedImage(info.fileList); // Clear the file if upload failed
	// 		}
	// 	},
	// 	onDrop(e) {
	// 		console.log("Dropped files", e.dataTransfer.files);
	// 	},
	// };
	const props: UploadProps = {
		name: "file",
		multiple: false, // Only upload one image at a time
		customRequest: async ({ file, onSuccess, onError }) => {
			try {
				// Cast the file to RcFile to access properties like name
				const rcFile = file as RcFile;

				const imageUrl = await uploadImageToCloudinary(rcFile); // Upload to Cloudinary
				setUploadedImageUrl(imageUrl); // Store the uploaded image URL
				onSuccess?.("Upload successful");
				message.success(`${rcFile.name} uploaded successfully`); // Access the name property safely
			} catch (error: any) {
				onError?.(error);
				message.error("Image upload failed");
			}
		},
		onDrop(e) {
			console.log("Dropped files", e.dataTransfer.files);
		},
	};
	const handleSubmit = async (value: any) => {
		setLoading(true);
		const { featured_image, ...rest } = value;
		const payload = {
			...rest,
			featured_image: uploadedImageUrl,
		};
		try {
			const res: any = await adminRequests.createBlog(payload);
			message.success(res.message);
			form.resetFields();
		} catch (error: any) {
			message.error(error.message);
		} finally {
			setLoading(false);
		}
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
						onFinish={handleSubmit}
					>
						<Form.Item label="Heading" className="inter-normal" name={"title"}>
							<Input placeholder="Lorem ipsum..." className="p-2" />
						</Form.Item>
						<Form.Item
							label="Subheading"
							className="inter-normal"
							name={"subheading"}
						>
							<Input placeholder="Lorem ipsum..." className="p-2" />
						</Form.Item>
						<Form.Item
							label="Category"
							className="inter-normal"
							name={"category"}
						>
							<Select
								placeholder="Select Catgeory"
								className="!p-[20px] inter-bold bg-[#fff] !text-black !outline-none !hover:border-none !border-none rounded-[6px]"
							>
								<Select.Option value="Technology">Technology</Select.Option>
								<Select.Option value="Business">Business</Select.Option>
								<Select.Option value="Health">Health & Fitness</Select.Option>
								<Select.Option value="Science & Natur">
									Science & Nature
								</Select.Option>
								<Select.Option value="Lifestyle">Lifestyle</Select.Option>
								<Select.Option value="Sports">Sports</Select.Option>
								<Select.Option value="World">World</Select.Option>
								<Select.Option value="Education">Education</Select.Option>
								<Select.Option value="Culture">Culture</Select.Option>
								<Select.Option value="Arts">Arts</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item label="Body" className="inter-normal" name={"content"}>
							<Input.TextArea placeholder="message" className="p-2" />
						</Form.Item>
						<Form.Item label="Upload Image" name={"featured_image"}>
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
							name={"minutes_read"}
						>
							<Input placeholder="2" className="p-2" type="number" />
						</Form.Item>
						<Form.Item
							label="Name of author"
							className="inter-normal"
							name={"name_of_author"}
						>
							<Input readOnly placeholder="Aluko Folajimi" className="p-2" />
						</Form.Item>
						<Button
							htmlType="submit"
							block
							loading={loading}
							disabled={loading}
							className="my-[15px] p-[20px] text-white bg-[#581A57]"
						>
							Publish
						</Button>
					</Form>
				</div>
			</div>
		</Layout>
	);
};

export default CreateBlogPage;
