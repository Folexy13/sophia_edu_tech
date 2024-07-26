import React, { useEffect, useRef, useState } from "react";
import Layout from "../../Layout";
import { AddressLocator, profileBG } from "../../../assets";
import { Avatar, Button, Form, FormProps, Input } from "antd";
import "./profile.styles.scss";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useAlert, UserProps, useUser } from "../../../store";
import { ClientRequest } from "../../../requests";
import { getAvatar } from "../../../utils/helperFunction";

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
	location: { country_region: null, city: null },
	licenses_certifications: [{}],
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
	work_experience: [
		{
			company: "",
			role_title: "",
			job_description: "",
			start_date: "",
			end_date: "",
		},
	],
	bio: "",
};

type EntityType = "education" | "licenses_certifications" | "work_experience";
const Profile: React.FC<any> = () => {
	const [form] = Form.useForm();
	const { onFailure, onSuccess } = useAlert();
	const { setUser, user } = useUser();
	const [isLoading, setIsLoading] = useState(false);
	const [removing, setRemoving] = useState(0);
	const [adding, setAdding] = useState(0);
	const [entities, setEntities] = useState<{ [key in EntityType]?: any[] }>({
		education: initialProfileValues.education,
		licenses_certifications: initialProfileValues.licenses_certifications,
		work_experience: initialProfileValues.work_experience,
	});
	const [profile, setProfile] = useState<UserProps | null>(
		initialProfileValues
	);
	const fileInputRef: any = useRef(null);
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
		console.log(form.getFieldValue("work_experience"));
		if (form.getFieldValue("work_experience")?.length === 0) {
			form.setFieldsValue({
				work_experience: [
					{
						id: 1,
						company: "",
						role_title: "",
						job_description: "",
						start_date: "",
						end_date: "",
					},
				],
			});
		}
	}, [user]);
	useEffect(() => {
		if (user) {
			form.setFieldsValue(user);
			setEntities({
				education:
					user.education && user.education?.length > 0
						? user.education
						: initialProfileValues.education,
				licenses_certifications:
					user.licenses_certifications &&
					user.licenses_certifications?.length > 0
						? user.licenses_certifications
						: initialProfileValues.licenses_certifications,
				work_experience:
					user.work_experience && user.work_experience?.length > 0
						? user.work_experience
						: initialProfileValues.work_experience,
			});
		}
	}, [user, form]);
	const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (file) {
			// Display the image preview
			setImageUrl(URL.createObjectURL(file));

			// Prepare the form data for the file upload
			const formData = new FormData();
			formData.append("file", file);

			try {
				// Upload the file to the server

				await ClientRequest.uploadImage(file);
				onSuccess("Profile Image Changed successfully!");
			} catch (error: any) {
				onFailure(error);
			}
		}
	};
	const handleUpdateProfile: FormProps<UserProps>["onFinish"] = async (
		value: UserProps
	) => {
		setIsLoading(true);
		try {
			if (form.getFieldValue("education")[0]?.school === "0") {
				form.setFieldsValue({
					education: form.getFieldValue("education"),
					licenses_certifications: form.getFieldValue(
						"licenses_certifications"
					),
					work_experience: form.getFieldValue("work_experience"),
				});
			}

			const resp: any = await ClientRequest.updateMe(value); // Assuming AuthRequest returns a promise
			const res: any = await ClientRequest.getMe();
			setUser(res);
			onSuccess(resp.message);
		} catch (error: any) {
			console.error("Login error:", error);
			onFailure(error.message); // Trigger failure alert
		} finally {
			setIsLoading(false);
		}
	};

	const addEntity = (
		entity: "education" | "licenses_certifications" | "work_experience"
	) => {
		const newItem =
			entity === "education"
				? {
						id: entities.education && entities.education.length + 1,
						school: "",
						degree: "",
						field_of_study: "",
						start_date: "",
						end_date: "",
				  }
				: entity === "licenses_certifications"
				? {
						id:
							entities.licenses_certifications &&
							entities.licenses_certifications.length + 1,
						name: "",
						issuing_organization: "",
						issue_date: "",
						expiration_date: "",
						credential_id: "",
						credential_url: "",
				  }
				: {
						id: entities.work_experience && entities.work_experience.length + 1,
						company: "",
						role: "",
						job_description: "",
						start_date: "",
						end_date: "",
				  };
		setEntities((prevState: any) => ({
			...prevState,
			[entity]: [...prevState[entity], newItem],
		}));
	};

	const saveEntity = async (
		index: string,
		entity: "education" | "licenses_certifications" | "work_experience",
		data: any
	) => {
		try {
			setAdding(parseInt(index) + 1);
			await ClientRequest.addProfileEntity(index, entity, data);
		} catch (error) {
		} finally {
			setAdding(0);
		}
	};

	const removeEntity = async (index: number, entity: EntityType) => {
		setRemoving(index + 1);
		setEntities((prevState: any) => ({
			...prevState,
			[entity]: [],
		}));
		try {
			await ClientRequest.deleteProfileEntity(index.toString(), entity);
			console.log(entities);
		} catch (error) {
			console.log(error);
		} finally {
			console.log(form.getFieldValue(entity), index);
			form.getFieldValue(entity).filter((val: any) => val.id != index);
			setEntities((prevState: any) => ({
				...prevState,
				[entity]: form
					.getFieldValue(entity)
					.filter((val: any) => val.id != index),
			}));
			setRemoving(0);
		}
	};

	return (
		<Layout loading={!user}>
			<div className="w-[90%] md-920:w-4/5 mx-auto profile">
				<div className="relative">
					<img
						alt="example"
						src={profileBG} // Changed to use image prop
						className="h-[120px] sm:h-[200px] w-full object-cover rounded-md"
					/>
					<div className="flex justify-between">
						<div className="mb-3 relative flex gap-2 bottom-[15px]  left-[30px] md-920:left-[100px] ">
							<Avatar
								size={64}
								className="cursor-pointer border-4 border-solid border-white "
								src={imageUrl || getAvatar(user?.profile_image)} // Changed to use avatar prop
								alt="Profile Image" // Changed to use avatar prop
								onClick={() => fileInputRef.current?.click()}
							/>
							<input
								type="file"
								ref={fileInputRef}
								style={{ display: "none" }}
								onChange={handleFileChange}
							/>
							<div className=" flex flex-col gap-y-1">
								<h2 className="text-[16px] font-medium mt-[18px]">
									{profile?.full_name}
								</h2>
								<p className="text-[#808080] flex gap-2 items-center text-[14px] ">
									<AddressLocator />
									Location
								</p>
								<p className="text-[#808080] cursor-pointer text-[14px]">
									Change Profile Picture
								</p>
							</div>
						</div>

						<div className="sm:flex gap-3 hidden">
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
					<div className="flex flex-col md-920:flex-row gap-2 my-[28px]">
						<div className="w-full md-920:w-1/2">
							<div>
								<h3 className="mb-[10px] text-[24px] font-semibold">
									Personal Information
								</h3>
								<p className="text-[#666666] text-[16px] w-full lg:w-[72%]">
									Take an insight into your user name and bio
								</p>
							</div>
						</div>
						<div className="w-full md-920:w-1/2">
							<Form.Item
								label="Full Name"
								className="inter-normal"
								name="full_name"
							>
								<Input placeholder="Aluko Folajimi" className="p-2" />
							</Form.Item>
							<Form.Item label="Bio" className="inter-normal" name="bio">
								<Input.TextArea placeholder="I am a..." className="p-2" />
							</Form.Item>
						</div>
					</div>

					{/* location */}
					<div className="flex flex-col md-920:flex-row gap-2 my-[28px]">
						<div className="w-full md-920:w-1/2">
							<div>
								<h3 className="mb-[10px] text-[24px] font-semibold">
									Location
								</h3>
								<p className="text-[#666666] text-[16px] w-full lg:w-[72%]">
									Get insight into your location
								</p>
							</div>
						</div>
						<div className="w-full md-920:w-1/2">
							<Form.Item
								label="Country/Region"
								className="inter-normal"
								name={["location", "country_region"]}
							>
								<Input placeholder="Nigeria" className="p-2" />
							</Form.Item>
							<Form.Item className="inter-normal mt-[-20px]">
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

					<div className="flex flex-col md-920:flex-row gap-2 my-[28px]">
						<div className="w-full md-920:w-1/2">
							<div>
								<h3 className="mb-[10px] text-[24px] font-semibold">
									Education
								</h3>
								<p className="text-[#666666] text-[16px] w-full lg:w-[72%]">
									your educational background
								</p>
							</div>
						</div>

						<div className="w-full md-920:w-1/2">
							{entities.education?.map((data: any, index: number) => (
								<div key={index}>
									<Form.Item
										label="School"
										className="inter-normal hidden"
										name={["education", index, "id"]}
									>
										<Input
											placeholder="University of Stafford"
											className="p-2"
											defaultValue={index + 1}
											value="ggg"
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
												loading={removing === data.id + 1}
												disabled={removing === data.id + 1}
												onClick={() => removeEntity(data.id, "education")}
												className="bg-[#DBDBDB] !hover:bg-[#DBDBDB] text-[#3A3A3A] text-[14px] rounded-[8px]"
											>
												Remove
											</Button>
										)}
										<Button
											type="link"
											onClick={() => addEntity("education")}
											className="bg-[#3A3A3A] hover:!bg-[#3A3A3A] ml-[10px] text-[#fff] hover:!text-[#fff] text-[14px] rounded-[8px]"
										>
											Add More
										</Button>
									</div>
								</div>
							))}
						</div>
					</div>
					{/* Work experience */}
					<div className="flex flex-col md-920:flex-row gap-2 my-[28px]">
						<div className="w-full md-920:w-1/2">
							<div>
								<h3 className="mb-[10px] text-[24px] font-semibold">
									Work Experience
								</h3>
								<p className="text-[#666666] text-[16px] w-full lg:w-[72%]">
									How long have you been in the work industry?
								</p>
							</div>
						</div>
						<div className="w-full md-920:w-1/2">
							{entities.work_experience?.map((data: any, index: number) => (
								<div key={index}>
									<Form.Item
										label="Company"
										className="inter-normal"
										name={["work_experience", index, "company"]}
									>
										<Input
											placeholder="Chevron group of company"
											className="p-2"
										/>
									</Form.Item>
									<Form.Item
										label="Role/Title"
										className="inter-normal"
										name={["work_experience", index, "role_title"]}
									>
										<Input placeholder="Senior Developer" className="p-2" />
									</Form.Item>
									<Form.Item
										label="Job Description"
										className="inter-normal"
										name={["work_experience", index, "job_description"]}
									>
										<Input placeholder="Engineering" className="p-2" />
									</Form.Item>

									<Form.Item
										label="Start Date"
										className="inter-normal w-full"
										name={["work_experience", index, "start_date"]}
									>
										<Input
											placeholder="1902-02-02"
											className="p-2"
											type="date"
										/>
									</Form.Item>
									<Form.Item
										label="End Date"
										className="inter-normal"
										name={["work_experience", index, "end_date"]}
									>
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
												loading={removing === data.id + 1}
												disabled={removing === data.id + 1}
												onClick={() => removeEntity(data.id, "education")}
												className="bg-[#DBDBDB] !hover:bg-[#DBDBDB] text-[#3A3A3A] text-[14px] rounded-[8px]"
											>
												Remove
											</Button>
										)}
										<Button
											type="link"
											onClick={() => addEntity("work_experience")}
											className="bg-[#3A3A3A] hover:!bg-[#3A3A3A] ml-[10px] text-[#fff] hover:!text-[#fff] text-[14px] rounded-[8px]"
										>
											Add More
										</Button>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Licenses and Certifications */}
					<div className="flex flex-col md-920:flex-row gap-2 my-[28px]">
						<div className="w-full md-920:w-1/2">
							<div>
								<h3 className="mb-[10px] text-[24px] font-semibold">
									Licenses and Certifications
								</h3>
								<p className="text-[#666666] text-[16px] w-full lg:w-[72%]">
									This is the area to showcase what you have got
								</p>
							</div>
						</div>
						<div className="w-full md-920:w-1/2">
							{entities.licenses_certifications?.map(
								(data: any, index: number) => (
									<div key={index}>
										<Form.Item
											label="Name"
											className="inter-normal"
											name={["licenses_certifications", index, "name"]}
										>
											<Input
												placeholder="Diploma in AGILE Methodology"
												className="p-2"
											/>
										</Form.Item>
										<Form.Item
											label="Issuing Organization"
											className="inter-normal"
											name={[
												"licenses_certifications",
												index,
												"issuing_organization",
											]}
										>
											<Input placeholder="Microsoft" className="p-2" />
										</Form.Item>
										<Form.Item
											label="Issue Date"
											className="inter-normal"
											name={["licenses_certifications", index, "issue_date"]}
										>
											<Input
												placeholder="1902-02-02"
												className="p-2"
												type="date"
											/>
										</Form.Item>

										<Form.Item
											label="Expiration Date"
											className="inter-normal"
											name={[
												"licenses_certifications",
												index,
												"expiration_date",
											]}
										>
											<Input
												placeholder="1902-02-02"
												className="p-2"
												type="date"
											/>
										</Form.Item>
										<Form.Item
											label="Credential ID"
											className="inter-normal"
											name={[
												"licenses_certifications",
												index,
												"credentials_id",
											]}
										>
											<Input placeholder="#2CDMW34C" className="p-2" />
										</Form.Item>
										<Form.Item
											label="Credential URL"
											className="inter-normal"
											name={[
												"licenses_certifications",
												index,
												"credential_url",
											]}
										>
											<Input
												placeholder="https://placeholder.io"
												className="p-2"
											/>
										</Form.Item>
										<div className="flex gap-2 my-[26px] justify-end">
											{index > 0 && (
												<Button
													htmlType="button"
													loading={removing === data.id + 1}
													disabled={removing === data.id + 1}
													onClick={() => removeEntity(data.id, "education")}
													className="bg-[#DBDBDB] !hover:bg-[#DBDBDB] text-[#3A3A3A] text-[14px] rounded-[8px]"
												>
													Remove
												</Button>
											)}
											<Button
												type="link"
												onClick={() => addEntity("licenses_certifications")}
												className="bg-[#3A3A3A] hover:!bg-[#3A3A3A] ml-[10px] text-[#fff] hover:!text-[#fff] text-[14px] rounded-[8px]"
											>
												Add More
											</Button>
										</div>
									</div>
								)
							)}
						</div>
					</div>
					<div className="flex flex-col md-920:flex-row gap-2 my-[28px]">
						<div
							className="w-full md-920:w-1/2"
							style={{ visibility: "hidden" }}
						></div>
						<div className="w-full md-920:w-1/2">
							<Button
								htmlType="submit"
								block
								loading={isLoading}
								disabled={isLoading}
								className="my-[15px] p-[10px] text-white bg-[#581A57]"
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
