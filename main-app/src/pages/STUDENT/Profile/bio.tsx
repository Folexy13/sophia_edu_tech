import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import { avatar, profileBG } from "../../../assets";
import { Avatar, Button, DatePicker, Form, FormProps, Input } from "antd";
import { HeatMapOutlined } from "@ant-design/icons";
import "./profile.styles.scss";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import clientRequests from "../../../requests/client.request";
import { useAlert, UserProps, useUser } from "../../../store";

dayjs.extend(customParseFormat);

const initialProfileValues: UserProps = {
	full_name: "",
	email: "",
	password: "",
	confirm_password: "",
	age: 0,
	gender: "male",
	is_subscribed: false,
	role: "student",
	phone: "",
	location: null,
	licenses_certifications: [],
	education: [
		{
			id: 1,
			school: "",
			degree: "",
			field_of_study: "",
			start_date: "",
			end_date: "",
		},
	],
	work_experience: [],
	bio: "",
};

const dateFormat = "YYYY-MM-DD";
const Profile: React.FC<any> = () => {
	const [form] = Form.useForm();
	const { onFailure, onSuccess } = useAlert();
	const { setUser, user } = useUser();
	const [isLoading, setIsLoading] = useState(false);
	const [profile, setProfile] = useState<UserProps | null>(
		initialProfileValues
	);
	useEffect(() => {
		setProfile(user);
		if (user) {
			form.setFieldsValue(user);
		}
		if (form.getFieldValue("education")?.length === 0) {
			form.setFieldsValue({
				education: [
					{
						id: 1,
						school: "",
						degree: "",
						field_of_study: "",
						start_date: "",
						end_date: "",
					},
				],
			});
		}
	}, [user]);

	useEffect(() => {
		const fetchData = async () => {
			if (!user) {
				try {
					const res: any = await clientRequests.getMe(); // Assuming AuthRequest returns a promise
					setUser(res);
				} catch (error: any) {
					console.error("Login error:", error);
					onFailure(error.message); // Trigger failure alert
				} finally {
					setIsLoading(false);
				}
			}
		};
		fetchData();
	}, []);

	const handleUpdateProfile: FormProps<UserProps>["onFinish"] = async (
		value: UserProps
	) => {
		try {
			if (form.getFieldValue("education")[0]?.school === "0") {
				alert("hhee");
				form.setFieldsValue({
					education: [],
				});
			}

			console.log(value);
			const resp: any = await clientRequests.updateMe(value); // Assuming AuthRequest returns a promise
			const res: any = await clientRequests.getMe();
			setUser(res);
			onSuccess(resp.message);
		} catch (error: any) {
			console.error("Login error:", error);
			onFailure(error.message); // Trigger failure alert
		} finally {
			setIsLoading(false);
		}
	};

	const addEducation = () => {
		const educations = form.getFieldValue("education");
		const lastEducation = educations[educations.length - 1];
		console.log(educations);

		if (
			lastEducation?.school &&
			lastEducation?.degree &&
			lastEducation?.field_of_study &&
			lastEducation?.start_date &&
			lastEducation?.end_date
		) {
			form.setFieldsValue({
				education: [
					...educations,
					{
						id: educations.length,
						school: "",
						degree: "",
						field_of_study: "",
						start_date: "",
						end_date: "",
					},
				],
			});
		}
	};

	const removeEducation = (index: number) => {
		const educations = form.getFieldValue("education");
		educations.splice(index, 1);
		const updatedEducations = educations;
		form.setFieldValue("education", updatedEducations);
		console.log({ updatedEducations });
		console.log({ educations });
		console.log({ form: form.getFieldsValue() });
	};
	return (
		<Layout loading={!user}>
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
									{profile?.full_name}
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
				<Form
					form={form}
					layout="vertical"
					initialValues={initialProfileValues}
					onFinish={handleUpdateProfile}
				>
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
							<Form.Item
								label="Full Name"
								className="inter-normal"
								name="full_name"
							>
								<Input placeholder="Aluko Folajimi" className="p-2" />
							</Form.Item>
							<Form.Item label="Bio" className="inter-normal" name="bio">
								<Input placeholder="I am a..." className="p-2 py-5" />
							</Form.Item>
						</div>
					</div>

					{/* location */}
					<div className="flex gap-2 my-[28px]">
						<div className="w-1/2">
							<div>
								<h3 className="mb-[10px] text-[24px] font-semibold">
									Location
								</h3>
								<p className="text-[#666666] text-[16px] w-full lg:w-[72%]">
									Get insight into your location
								</p>
							</div>
						</div>
						<div className="w-1/2">
							<Form.Item
								label="Country/Region"
								className="inter-normal"
								name={["location", "country_region"]}
							>
								<Input placeholder="Nigeria" className="p-2" />
								<Button type="link" className="text-[#581A57] p-0">
									Use current Location
								</Button>
							</Form.Item>
							<Form.Item
								label="City"
								className="inter-normal"
								name={["location", "city"]}
							>
								<Input placeholder="Lagos" className="p-2" />
							</Form.Item>
						</div>
					</div>

					{/* Education */}

					<div className="flex gap-2 my-[28px]">
						<div className="w-1/2">
							<div>
								<h3 className="mb-[10px] text-[24px] font-semibold">
									Education
								</h3>
								<p className="text-[#666666] text-[16px] w-full lg:w-[72%]">
									your educational background
								</p>
							</div>
						</div>

						<div className="w-1/2">
							{form
								.getFieldValue("education")
								?.map((data: any, index: number) => (
									<div key={index}>
										<Form.Item
											label="School"
											className="inter-normal hidden"
											name={["education", index, "id"]}
										>
											<Input
												placeholder="University of Stafford"
												className="p-2"
												value={index}
											/>
										</Form.Item>
										<Form.Item
											label="School"
											className="inter-normal"
											name={["education", index, "school"]}
										>
											<Input
												placeholder="University of Stafford"
												className="p-2"
											/>
										</Form.Item>
										<Form.Item
											label="Degree"
											className="inter-normal"
											name={["education", index, "degree"]}
										>
											<Input placeholder="BSc. Agriculture" className="p-2" />
										</Form.Item>
										<Form.Item
											label="Field of Study"
											className="inter-normal"
											name={["education", index, "field_of_study"]}
										>
											<Input placeholder="Engineering" className="p-2" />
										</Form.Item>
										<Form.Item
											label="Start Date"
											className="inter-normal w-full"
											name={["education", index, "start_date"]}
										>
											{/* <DatePicker
											defaultValue={dayjs("2019-09-03", dateFormat)}
											minDate={dayjs("2019-08-01", dateFormat)}
											maxDate={dayjs("2120-10-31", dateFormat)}
											className="w-full p-2"
										/> */}
											<Input
												placeholder="1902-02-02"
												className="p-2"
												type="date"
											/>
										</Form.Item>
										<Form.Item
											label="End Date"
											className="inter-normal"
											name={["education", index, "end_date"]}
										>
											{/* <DatePicker
											defaultValue={dayjs("2019-09-03", dateFormat)}
											minDate={dayjs("2019-08-01", dateFormat)}
											maxDate={dayjs("2120-10-31", dateFormat)}
											className="w-full p-2"
										/> */}
											<Input
												placeholder="1902-02-02"
												className="p-2"
												type="date"
											/>
										</Form.Item>
										<div className="flex gap-2 my-[26px] justify-end">
											{index > 0 && (
												<Button
													htmlType="button"
													onClick={() => removeEducation(index)}
													className="bg-[#DBDBDB] !hover:bg-[#DBDBDB] text-[#3A3A3A] text-[14px] rounded-[8px]"
												>
													Remove
												</Button>
											)}
											<Button
												type="link"
												onClick={addEducation}
												className="bg-[#3A3A3A] !hover:bg-[#3A3A3A] ml-[10px] text-[#fff] text-[14px] rounded-[8px]"
											>
												Add More
											</Button>
										</div>
									</div>
								))}
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
								<Form.Item
									label="Company"
									className="inter-normal"
									name={["work_experience", "company"]}
								>
									<Input
										placeholder="Chevron group of company"
										className="p-2"
									/>
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
								<Form.Item
									label="Issuing Organization"
									className="inter-normal"
								>
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
							</Form>
						</div>
					</div>
					<div className="flex gap-2 my-[28px]">
						<div className="w-1/2" style={{ visibility: "hidden" }}></div>
						<div className="w-1/2">
							<Button
								htmlType="submit"
								block
								loading={isLoading}
								disabled={isLoading}
								className="my-[15px] text-white bg-[#581A57]"
							>
								Update
							</Button>
						</div>
					</div>
				</Form>
			</div>
		</Layout>
	);
};

export default Profile;
