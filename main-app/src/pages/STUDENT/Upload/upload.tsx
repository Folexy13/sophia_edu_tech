import React, { useState } from "react";
import Layout from "../../Layout";
import { Form, Input, Select } from "antd";
import { Button } from "../../../components";

import type { UploadProps } from "antd";
import { message, Upload as AntDUpload } from "antd";
import { UploadIcon } from "../../../assets";
import "./upload.styles.scss";

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

const { Option } = Select;
const Upload: React.FC<any> = () => {
	const [loading, setLoading] = useState(false);
	const handleSubmit = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	};
	function handleChange(value: any) {
		console.log(`Selected: ${value}`);
	}
	return (
		<Layout>
			<div className="w-[90%] sm:w-3/5 mx-auto upload">
				<h2 className="text-[24px] sm:text-center my-[20px] font-semibold">
					Enterprise Project
				</h2>
				<p className="text-[16px] sm:text-center mb-[20px]">
					Upload your enterprise project here. This may include some or all of
					the following: business plan that explains the business idea of your
					project, DOI of research work supporting your project, website or
					video link explaining your project
				</p>

				<Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
					<Form.Item label="Title">
						<Input
							name="title"
							className="p-2"
							placeholder="Enter title(max word of 100)"
						/>
					</Form.Item>
					<Form.Item label="Executive summary">
						<Input
							name="executive_summary"
							className="p-2"
							placeholder="Enter executive summary (max word of 500)"
						/>
					</Form.Item>
					<Form.Item label="Document">
						<Dragger {...props}>
							<p className="ant-upload-drag-icon flex justify-center">
								<UploadIcon />
							</p>
							<p className="ant-upload-hint">
								(max file size: 200mb - pdf,docx,ppt,xl)
							</p>
						</Dragger>
					</Form.Item>
					<Form.Item label="Add Links">
						<Input name="doi" className="p-2 mb-[20px]" placeholder="DOI" />
						<Input name="video_link" className="p-2" placeholder="Video link" />
					</Form.Item>
					<Form.Item label="Subject(s) your project belongs">
						<Select
							placeholder="Search Subject"
							className="w-full bg-white h-[38px] rounded-sm"
							onChange={handleChange}
						>
							<Option value="enrolled">Enrolled</Option>
							<Option value="agriculture">Agriculture</Option>
							<Option value="applied_science" disabled>
								Applied Science
							</Option>
						</Select>
					</Form.Item>
					<div style={{ marginTop: "20px", textAlign: "right" }}>
						<Button
							label={"Submit"}
							loading={loading}
							onclick={handleSubmit}
							className="p-[20px] w-full sm:w-[200px] bg-[#581A57] text-white mb-[90px]"
						/>
					</div>
				</Form>
			</div>
		</Layout>
	);
};

export default Upload;
