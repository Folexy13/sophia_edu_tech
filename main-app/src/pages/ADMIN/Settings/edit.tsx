import React, { useState } from "react";
import Layout from "../../DashboardLayout";
import { Button, Checkbox, Form, Input, Select } from "antd";

const CheckboxGroup = Checkbox.Group;

const options = [
	{ label: "All", value: "All" },
	{ label: "Access to wallet", value: "Access to wallet" },
	{
		label: "Access to dashboard/overview",
		value: "Access to dashboard/overview",
	},
	{ label: "Access to overview", value: "Access to overview" },
	{ label: "Access to instructor", value: "Access to instructor" },
	{ label: "Access to courses", value: "Access to courses" },
];

const Settings: React.FC = () => {
	const [checkedValues, setCheckedValues] = useState<any[]>([]);

	const onChange = (checkedValues: any[]) => {
		console.log("checkedValues:", checkedValues);
		setCheckedValues(checkedValues);
	};
	return (
		<Layout title="Settings" isAdmin>
			<Form layout="vertical" className="p-4 sm:p-0">
				{/* User Information */}
				<div className="flex flex-col sm:flex-row gap-2 my-[28px]">
					<div className="w-full sm:w-1/2">
						<div>
							<h3 className="mb-[10px] text-[24px] font-semibold">
								User Information
							</h3>
							<p className="text-[#666666] text-[16px] w-full lg:w-[72%]">
								Edit user biodata
							</p>
						</div>
					</div>
					<div className="w-full sm:w-1/2">
						<Form.Item
							label="Full Name"
							className="inter-normal"
							name="full_name"
						>
							<Input placeholder="Aluko Folajimi" className="p-2" />
						</Form.Item>
						<Form.Item
							label="Email Address"
							className="inter-normal"
							name="email"
						>
							<Input placeholder="Folajimi123@gmail.com" className="p-2" />
						</Form.Item>
						<Form.Item
							label="Phone Number"
							className="inter-normal"
							name="phone"
						>
							<Input placeholder="+23471734492474" className="p-2" />
						</Form.Item>
					</div>
				</div>

				{/* Role */}
				<div className="flex flex-col sm:flex-row gap-2 my-[28px]">
					<div className="w-full sm:w-1/2">
						<div>
							<h3 className="mb-[10px] text-[24px] font-semibold">Role</h3>
							<p className="text-[#666666] text-[16px] w-full lg:w-[72%]">
								Add/Remove User Role
							</p>
						</div>
					</div>
					<div className="w-full sm:w-1/2">
						<Form.Item
							label="Role"
							className="inter-normal"
							name="current_password"
						>
							<Select
								placeholder="Select Role"
								className="!p-[20px] inter-bold bg-[#fff] !text-black !outline-none !hover:border-none !border-none rounded-[6px]"
							>
								<Select.Option value="Customer Support">
									Customer Support
								</Select.Option>
								<Select.Option value="Developer">Developer</Select.Option>
								<Select.Option value="Marketer">Marketer</Select.Option>
								<Select.Option value="Accountant">Accountant</Select.Option>
							</Select>
						</Form.Item>

						<Form.Item
							label="Role of Customer support"
							className="inter-normal"
							name="new_password"
						>
							<CheckboxGroup
								options={options}
								className="checkbox-group flex-1"
								value={checkedValues}
								onChange={onChange}
							/>
						</Form.Item>

						<Form.Item
							label="Confirm Password"
							className="inter-normal"
							name="confirm_password"
						>
							<Input type="password" className="p-2" />
						</Form.Item>
					</div>
				</div>
				<div className="flex flex-col sm:flex-row gap-2 my-[28px]">
					<div
						className="w-full sm:w-1/2 hidden sm:block"
						style={{ visibility: "hidden" }}
					></div>
					<div className="w-full sm:w-1/2">
						<Button
							htmlType="submit"
							block
							className="my-[15px] p-[10px] text-white bg-[#581A57]"
						>
							Update User
						</Button>
					</div>
				</div>
			</Form>
		</Layout>
	);
};

export default Settings;
