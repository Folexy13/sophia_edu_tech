import React from "react";
import Layout from "../../DashboardLayout";
import { Card, Dropdown, Form, Input, Space, TableColumnsType } from "antd";
import { avatar, FilterIcon } from "../../../assets";
import { Button, Table } from "../../../components";
import { getRandomDate, getRandomItem } from "../../../utils/helperFunction";
import { useScreenSize } from "../../../utils/hooks/useScreen";
import { useNavigate } from "react-router-dom";
const instructorNames = [
	"Aluko Folajimi",
	"John Doe",
	"Jane Smith",
	"Chris Johnson",
];

const roles = ["Developer", "Customer Support", "Marketer"];

const columns: TableColumnsType<any> = [
	{
		title: "User",
		dataIndex: "user",
	},
	{
		title: "Email Address",
		dataIndex: "email",
	},
	{
		title: "Phone number",
		dataIndex: "phone_number",
	},
	{
		title: "Role",
		dataIndex: "role",
	},
	{
		title: "Date",
		dataIndex: "date",
	},
	{
		title: "",
		dataIndex: "more",
	},
];

const SettingssPage: React.FC = () => {
	const isMobile = useScreenSize();
	const nav = useNavigate();
	const getDropdownItems = (id: number) => [
		{
			key: "1",
			label: (
				<div className="text-[14px] cursor-pointer">Deactivate/Reactivate</div>
			),
		},
		{
			key: "2",
			label: (
				<div
					className="text-[14px] cursor-pointer"
					onClick={() => nav(`/admin/user/${id + 1}`)}
				>
					View Personal information
				</div>
			),
		},
		{
			key: "3",
			label: <div className="text-[14px] cursor-pointer">Delete</div>,
		},
	];

	const data: any = [];
	for (let i = 0; i < 106; i++) {
		const instructorID = i;
		data.push({
			key: i,
			user: (
				<div className="flex gap-2 items-center">
					<img src={avatar} alt="avatar" width={20} />
					<p>{getRandomItem(instructorNames)}</p>
				</div>
			),
			email: "folajimiopeyemisax13@gmail.com",
			phone_number: "09030617605",
			more: (
				<Dropdown menu={{ items: getDropdownItems(instructorID) }}>
					<Space className="cursor-pointer">...</Space>
				</Dropdown>
			),
			role: getRandomItem(roles),
			date: getRandomDate(),
		});
	}

	return (
		<Layout title="Settings" hasMargin={!isMobile} isAdmin>
			<Card className="my-4 p-3 course_card">
				<header className="flex justify-between items-center">
					<div className="flex items-baseline gap-4">
						<h2 className="text-[16px] inter-bold">10 Roles and Permissions</h2>

						<Form>
							<Form.Item>
								<Input
									placeholder="Search "
									className="px-2 py-3 !outline-none border-[#DBDBDB] border w-[300px] rounded-[50px]"
								/>
							</Form.Item>
						</Form>
						<div className="flex items-center gap-2 cursor-pointer">
							<FilterIcon />
							<p className="text-[#808080] text-[14px] inter-normal">Filter</p>
						</div>
					</div>

					<div className="flex gap-3">
						<Button
							label="Export"
							className="text-[#808080] p-3 bg-transparent border-[#808080] border rounded-[5px]"
						/>
						<Button
							label="Create a new role"
							// onclick={() => nav(URL.ADMIN_C)}
							className="text-[#fff] p-3 bg-[#581A57]  border rounded-[5px]"
						/>
					</div>
				</header>

				<Table
					className="mt-[20px]"
					columns={columns}
					data={data}
					type={"selection"}
				/>
			</Card>
		</Layout>
	);
};

export default SettingssPage;
