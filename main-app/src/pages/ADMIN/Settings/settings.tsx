import React, { useState } from "react";
import Layout from "../../DashboardLayout";
import {
	Card,
	Dropdown,
	Form,
	Input,
	message,
	Space,
	TableColumnsType,
} from "antd";
import { avatar, FilterIcon } from "../../../assets";
import { Button, Modal, Table } from "../../../components";
import {
	exportToExcel,
	getRandomDate,
	getRandomItem,
} from "../../../utils/helperFunction";
import { useScreenSize } from "../../../utils/hooks/useScreen";
import { useNavigate } from "react-router-dom";
import adminRequests from "../../../requests/admin.request";
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
	const { isMobile } = useScreenSize();
	const nav = useNavigate();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [role, setRole] = useState("");
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
	const [loading, setLoading] = useState(false);
	const [expBtnLoading, setExpBtnLoading] = useState(false);

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
	const handleOk = async () => {
		setLoading(true);
		try {
			await adminRequests.createRole(role);
			message.success("Role Created successfully.");
			setRole("");
		} catch (error) {
			message.error("Failed to create role.");
			console.error(error);
		} finally {
			setLoading(false);
			setIsModalVisible(false); // Close the modal after deletion
		}
	};

	const handleExport = () => {
		setExpBtnLoading(true);
		const payload = {
			data,
			fileName: "Users-table-data",
		};
		try {
			exportToExcel(payload);
			message.success("Exported successfully");
		} catch (error) {
			console.log(error);
			message.error("Failed to export");
		} finally {
			setExpBtnLoading(false);
		}
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};
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
							onclick={handleExport}
							loading={expBtnLoading}
							disabled={expBtnLoading}
						/>
						<Button
							label="Create a new role"
							onclick={() => setIsModalVisible(true)}
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
				<Modal
					title="New Admin Role"
					isOpen={isModalVisible}
					onOk={null}
					confirmLoading={loading}
					onClose={handleCancel}
					okText="Yes"
					cancelText="No"
				>
					<Form layout="vertical">
						<Form.Item label="Role">
							<Input
								name="role"
								placeholder="Create New Role"
								value={role}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setRole(e.target.value)
								}
							/>
						</Form.Item>
						<Button
							loading={loading}
							disabled={loading || role === ""}
							htmlType="button"
							onclick={handleOk}
							block
							label="Create"
							className="mr-[10px] p-[8px] bg-[#581A57] text-white"
						/>
					</Form>
				</Modal>
			</Card>
		</Layout>
	);
};

export default SettingssPage;
