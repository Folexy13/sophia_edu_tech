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

const columns: TableColumnsType<any> = [
	{
		title: "Author",
		dataIndex: "author",
	},
	{
		title: "Heading",
		dataIndex: "heading",
	},
	{
		title: "Body",
		dataIndex: "body",
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

const BlogsPage: React.FC = () => {
	const isMobile = useScreenSize();
	const nav = useNavigate();
	const getDropdownItems = (id: number) => [
		{
			key: "1",
			label: <div className="text-[14px] cursor-pointer">View Blog</div>,
		},
		{
			key: "2",
			label: (
				<div
					className="text-[14px] cursor-pointer"
					onClick={() => nav(`/admin/instructor/${id + 1}/students`)}
				>
					Delete
				</div>
			),
		},
	];

	const data: any = [];
	for (let i = 0; i < 33; i++) {
		const instructorID = i;
		data.push({
			key: i,
			author: (
				<div className="flex gap-2 items-center">
					<img src={avatar} alt="avatar" width={20} />
					<p>{getRandomItem(instructorNames)}</p>
				</div>
			),
			heading: "Lorem ipsum heading",
			body: `Lorem ipsum dolor sit am subject to sed diam eu fugiat nulla pariatur. Lorem ipsum...`,
			more: (
				<Dropdown menu={{ items: getDropdownItems(instructorID) }}>
					<Space className="cursor-pointer">...</Space>
				</Dropdown>
			),
			date: getRandomDate(),
		});
	}
	return (
		<Layout title="Blogs" hasMargin={!isMobile} isAdmin>
			<Card className="my-4 p-3 course_card">
				<header className="flex justify-between items-center">
					<div className="flex items-baseline gap-4">
						<h2 className="text-[16px] inter-bold">{data?.length} Blogs</h2>

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
							label="Create a new post"
							onclick={() => nav(URL.ADMIN_CREATE_BLOGS)}
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

export default BlogsPage;
