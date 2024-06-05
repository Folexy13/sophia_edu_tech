import React from "react";
import Layout from "../../Layout";
import { avatar, profileBG } from "../../../assets";
import { Avatar, Button, DatePicker, Form, Input } from "antd";
import { HeatMapOutlined } from "@ant-design/icons";
import "./profile.styles.scss";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const dateFormat = "YYYY-MM-DD";
const Profile: React.FC<any> = () => {
	return (
		<Layout>
			<div className="w-4/5 mx-auto profile">
				<div className="relative">
					<img
						alt="example"
						src={profileBG} // Changed to use image prop
						className="h-[200px] w-full object-cover rounded-md"
					/>
					<div className="flex justify-between">
						<div className="mb-3 relative flex gap-2 bottom-[36px] sm:bottom-[20px]  left-[100px] ">
							<Avatar
								size={64}
								className="border-4 border-solid border-white "
								src={avatar} // Changed to use avatar prop
							/>
							<div className=" flex flex-col gap-y-1">
								<h2 className="text-[16px] font-medium mt-[18px]">
									Aluko Opeyemi Folajimi
								</h2>
								<p className="text-[#808080] text-[14px] ">
									<HeatMapOutlined />
									Location
								</p>
								<p className="text-[#808080] text-[14px]">
									Change Profile Picture
								</p>
							</div>
						</div>

						<div className="flex gap-3">
							<p className="text-[16px] font-medium mt-[18px] text-[#808080]">
								Bio - information
							</p>
							<p className="text-[16px] font-medium mt-[18px] underline">
								Settings
							</p>
						</div>
					</div>
				</div>

				{/* Personal Information */}
				<div className="flex gap-2 my-[28px]">
					<div className="w-1/2">
						<div>
							<h3 className="mb-[10px] text-[24px] font-semibold">
								Personal Information
							</h3>
							<p className="text-[#666666] text-[16px] w-full lg:w-[72%]">
								Take an insight into this user name and bio
							</p>
						</div>
					</div>
					<div className="w-1/2">
						<Form layout="vertical">
							<Form.Item label="Full Name" className="inter-normal">
								<Input placeholder="Aluko Folajimi" className="p-2" />
							</Form.Item>
							<Form.Item label="Bio" className="inter-normal">
								<Input placeholder="+2347067903042" className="p-2 py-5" />
							</Form.Item>
						</Form>
					</div>
				</div>

				{/* location */}
				<div className="flex gap-2 my-[28px]">
					<div className="w-1/2">
						<div>
							<h3 className="mb-[10px] text-[24px] font-semibold">Location</h3>
							<p className="text-[#666666] text-[16px] w-full lg:w-[72%]">
								Get insight into your location
							</p>
						</div>
					</div>
					<div className="w-1/2">
						<Form layout="vertical">
							<Form.Item label="Country/Region" className="inter-normal">
								<Input placeholder="Nigeria" className="p-2" />
								<Button type="link" className="text-[#581A57] p-0">
									Use current Location
								</Button>
							</Form.Item>
							<Form.Item label="City" className="inter-normal">
								<Input placeholder="Lagos" className="p-2" />
							</Form.Item>
						</Form>
					</div>
				</div>

				{/* Education */}
				<div className="flex gap-2 my-[28px]">
					<div className="w-1/2">
						<div>
							<h3 className="mb-[10px] text-[24px] font-semibold">Education</h3>
							<p className="text-[#666666] text-[16px] w-full lg:w-[72%]">
								your educational background
							</p>
						</div>
					</div>
					<div className="w-1/2">
						<Form layout="vertical">
							<Form.Item label="School" className="inter-normal">
								<Input placeholder="University of Stafford" className="p-2" />
							</Form.Item>
							<Form.Item label="Degree" className="inter-normal">
								<Input placeholder="BSc. Agriculture" className="p-2" />
							</Form.Item>
							<Form.Item label="Field of Study" className="inter-normal">
								<Input placeholder="Engineering" className="p-2" />
							</Form.Item>

							<Form.Item label="Start Date" className="inter-normal w-full">
								<DatePicker
									defaultValue={dayjs("2019-09-03", dateFormat)}
									minDate={dayjs("2019-08-01", dateFormat)}
									maxDate={dayjs("2120-10-31", dateFormat)}
									className="w-full p-2"
								/>
							</Form.Item>
							<Form.Item label="End Date" className="inter-normal">
								<DatePicker
									defaultValue={dayjs("2019-09-03", dateFormat)}
									minDate={dayjs("2019-08-01", dateFormat)}
									className="w-full p-2"
									maxDate={dayjs("2120-10-31", dateFormat)}
								/>
							</Form.Item>
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

				{/* Work experience */}
				<div className="flex gap-2 my-[28px]">
					<div className="w-1/2">
						<div>
							<h3 className="mb-[10px] text-[24px] font-semibold">
								Work Experience
							</h3>
							<p className="text-[#666666] text-[16px] w-full lg:w-[72%]">
								How long have you been in the work industry?
							</p>
						</div>
					</div>
					<div className="w-1/2">
						<Form layout="vertical">
							<Form.Item label="Company" className="inter-normal">
								<Input placeholder="Chevron group of company" className="p-2" />
							</Form.Item>
							<Form.Item label="Role/Title" className="inter-normal">
								<Input placeholder="Senior Developer" className="p-2" />
							</Form.Item>
							<Form.Item label="Job Description" className="inter-normal">
								<Input placeholder="Engineering" className="p-2" />
							</Form.Item>

							<Form.Item label="Start Date" className="inter-normal w-full">
								<DatePicker
									defaultValue={dayjs("2019-09-03", dateFormat)}
									minDate={dayjs("2019-08-01", dateFormat)}
									maxDate={dayjs("2120-10-31", dateFormat)}
									className="w-full p-2"
								/>
							</Form.Item>
							<Form.Item label="End Date" className="inter-normal">
								<DatePicker
									defaultValue={dayjs("2019-09-03", dateFormat)}
									minDate={dayjs("2019-08-01", dateFormat)}
									className="w-full p-2"
									maxDate={dayjs("2120-10-31", dateFormat)}
								/>
							</Form.Item>
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

				{/* Licenses and Certifications */}
				<div className="flex gap-2 my-[28px]">
					<div className="w-1/2">
						<div>
							<h3 className="mb-[10px] text-[24px] font-semibold">
								Licenses and Certifications
							</h3>
							<p className="text-[#666666] text-[16px] w-full lg:w-[72%]">
								This is the area to showcase what you have got
							</p>
						</div>
					</div>
					<div className="w-1/2">
						<Form layout="vertical">
							<Form.Item label="Name" className="inter-normal">
								<Input
									placeholder="Diploma in AGILE Methodology"
									className="p-2"
								/>
							</Form.Item>
							<Form.Item label="Issuing Organization" className="inter-normal">
								<Input placeholder="Microsoft" className="p-2" />
							</Form.Item>
							<Form.Item label="Issue Date" className="inter-normal">
								<DatePicker
									defaultValue={dayjs("2019-09-03", dateFormat)}
									minDate={dayjs("2019-08-01", dateFormat)}
									maxDate={dayjs("2120-10-31", dateFormat)}
									className="w-full p-2"
								/>
							</Form.Item>

							<Form.Item label="Expiration Date" className="inter-normal">
								<DatePicker
									defaultValue={dayjs("2019-09-03", dateFormat)}
									minDate={dayjs("2019-08-01", dateFormat)}
									className="w-full p-2"
									maxDate={dayjs("2120-10-31", dateFormat)}
								/>
							</Form.Item>
							<Form.Item label="Credential ID" className="inter-normal">
								<Input placeholder="#2CDMW34C" className="p-2" />
							</Form.Item>
							<Form.Item label="Credential URL" className="inter-normal">
								<Input placeholder="https://placeholder.io" className="p-2" />
							</Form.Item>
							<Form.Item className="w-full ml-auto justify-end flex">
								<Button className="bg-[#DBDBDB] text-[#3A3A3A] text-[14px] rounded-[8px]">
									Delete
								</Button>
								<Button className="bg-[#3A3A3A] ml-[10px] text-[#fff] text-[14px] rounded-[8px]">
									Add More
								</Button>
							</Form.Item>
							<Button block className="my-[15px] text-white bg-[#581A57]">
								Update
							</Button>
						</Form>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Profile;
