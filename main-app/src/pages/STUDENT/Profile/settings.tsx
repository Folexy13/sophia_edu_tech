import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import { avatar, profileBG } from "../../../assets";
import { Avatar, Checkbox, Form, Input, Select } from "antd";
import { HeatMapOutlined } from "@ant-design/icons";
import "./profile.styles.scss";
import { useUser } from "../../../store";

const Profile: React.FC<any> = () => {
	const { Option } = Select;
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const { user } = useUser();
	const [form] = Form.useForm();
	useEffect(() => {
		if (user) {
			form.setFieldsValue(user);
		}
	}, [user]);

	const handleChange = (value: string[]) => {
		setSelectedItems(value);
	};
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

				{/* Contact details */}
				<div className="flex gap-2 my-[28px]">
					<div className="w-1/2">
						<div>
							<h3 className="mb-[10px] text-[24px] font-semibold">
								Contact Details
							</h3>
							<p className="text-[#666666] text-[16px] w-full lg:w-[72%]">
								Take an insight into your basic unique credentials on our
								platform you can trust us for securities of them.
							</p>
						</div>
					</div>
					<div className="w-1/2">
						<Form layout="vertical" form={form}>
							<Form.Item
								label="Email Address"
								className="inter-normal"
								name="email"
							>
								<Input placeholder="folajimi....@gmail.com" className="p-2" />
							</Form.Item>
							<Form.Item label="Phone Number" className="inter-normal">
								<Input placeholder="+2347067903042" className="p-2" />
							</Form.Item>
						</Form>
					</div>
				</div>

				{/* follow subject */}
				<div className="flex gap-2 my-[28px]">
					<div className="w-1/2">
						<div>
							<h3 className="mb-[10px] text-[24px] font-semibold">
								Follow Subjects
							</h3>
							<p className="text-[#666666] text-[16px] w-full lg:w-[72%]">
								Let our recommendation system suggest your preferred project
								based on the subjects you follow
							</p>
						</div>
					</div>
					<div className="w-1/2">
						<Form layout="vertical">
							<Form.Item
								label="Click the  box below to follow"
								className="inter-normal"
							>
								<Select
									mode="multiple"
									value={selectedItems}
									onChange={handleChange}
									placeholder="Search Subject"
									className="w-full bg-white h-[38px] rounded-sm"
								>
									<Option value="english">
										<div>
											<Checkbox
												onChange={(e) => {
													if (e.target.checked) {
														setSelectedItems([...selectedItems, "english"]);
													} else {
														setSelectedItems(
															selectedItems.filter((item) => item !== "english")
														);
													}
												}}
												checked={selectedItems.includes("english")}
											>
												English
											</Checkbox>
										</div>
									</Option>
									<Option value="chemistry">
										<div>
											<Checkbox
												onChange={(e) => {
													if (e.target.checked) {
														setSelectedItems([...selectedItems, "chemistry"]);
													} else {
														setSelectedItems(
															selectedItems.filter(
																(item) => item !== "chemistry"
															)
														);
													}
												}}
												checked={selectedItems.includes("chemistry")}
											>
												Chemistry
											</Checkbox>
										</div>
									</Option>
								</Select>
							</Form.Item>
						</Form>
					</div>
				</div>

				{/* Reset password */}
				<div className="flex gap-2 my-[28px]">
					<div className="w-1/2">
						<div>
							<h3 className="mb-[10px] text-[24px] font-semibold">
								Reset Password
							</h3>
							<p className="text-[#666666] text-[16px] w-full lg:w-[72%]">
								Reset your password by confirm via out platform and your email
								account
							</p>
						</div>
					</div>
					<div className="w-1/2">
						<Form layout="vertical">
							<Form.Item label="Current Password" className="inter-normal">
								<Input
									placeholder="*********"
									type="password"
									className="p-2"
								/>
							</Form.Item>
							<Form.Item label="New Password" className="inter-normal">
								<Input type="password" className="p-2" />
							</Form.Item>
							<Form.Item label="Confirm Password" className="inter-normal">
								<Input
									placeholder="*********"
									type="password"
									className="p-2"
								/>
							</Form.Item>
						</Form>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Profile;
