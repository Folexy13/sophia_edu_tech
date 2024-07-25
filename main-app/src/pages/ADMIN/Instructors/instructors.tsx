import React from "react";
import Layout from "../../DashboardLayout";
import { Card, Dropdown, Form, Input, Space, TableColumnsType } from "antd";
import { avatar, FilterIcon } from "../../../assets";
import { Button, Table } from "../../../components";
import { getRandomDate, getRandomItem } from "../../../utils/helperFunction";
import { useScreenSize } from "../../../utils/hooks/useScreen";
import { useNavigate } from "react-router-dom";
import { URL } from "../../../utils/constants";
const instructorNames = [
	"Aluko Folajimi",
	"John Doe",
	"Jane Smith",
	"Chris Johnson",
];
const courses = ["Agriculture", "Engineering", "Mathematics", "Physics"];
const reviews = [
	"i enjoyed every bit",
	"Could be better",
	"Excellent course",
	"Very informative",
];
const feedbacks = ["Non Satisfactory", "Satisfactory"];

const columns: TableColumnsType<any> = [
	{
		title: "instructor Name",
		dataIndex: "instructor_name",
	},
	{
		title: "Course",
		dataIndex: "course",
	},
	{
		title: "Earnings",
		dataIndex: "earnings",
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

const StudentsPage: React.FC = () => {
	const isMobile = useScreenSize();
	const nav = useNavigate();
	const getDropdownItems = (id: number) => [
		{
			key: "1",
			label: <div className="text-[14px] cursor-pointer">View Info</div>,
		},
		{
			key: "2",
			label: (
				<div
					className="text-[14px] cursor-pointer"
					onClick={() => nav(`/admin/instructor/${id + 1}/students`)}
				>
					View Students
				</div>
			),
		},
	];

	const data: any = [];
	for (let i = 0; i < 106; i++) {
		const instructorID = i;
		data.push({
			key: i,
			instructor_name: (
				<div className="flex gap-2 items-center">
					<img src={avatar} alt="avatar" width={20} />
					<p>{getRandomItem(instructorNames)}</p>
				</div>
			),
			course: getRandomItem(courses),
			earnings: `$${Math.floor(Math.random() * 10) + 10}`,
			more: (
				<Dropdown menu={{ items: getDropdownItems(instructorID) }}>
					<Space className="cursor-pointer">...</Space>
				</Dropdown>
			),
			review: (
				<div className="flex gap-2">
					<span className="inter-normal text-[14px]">
						{getRandomItem(reviews)}
					</span>
					<span className="text-[#800080] inter-normal text-[14px]">
						see more
					</span>
				</div>
			),
			feedback: (
				<div className="text-[14px] inter-normal text-[#008FE4]">
					{getRandomItem(feedbacks)}
				</div>
			),
			date: getRandomDate(),
		});
	}
	return (
		<Layout title="Instructors" hasMargin={!isMobile} isAdmin>
			<Card className="my-4 p-3 course_card">
				<header className="flex justify-between items-center">
					<div className="flex items-baseline gap-4">
						<h2 className="text-[16px] inter-bold">
							{data?.length} Instructors
						</h2>

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
							label="Add Instructor"
							onclick={() => nav(URL.ADMIN_CREATE_INSTRUCTOR)}
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

export default StudentsPage;
