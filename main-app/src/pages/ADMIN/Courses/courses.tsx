import React from "react";
import Layout from "../../DashboardLayout";
import { Card, Form, Input, TableColumnsType } from "antd";
import { FilterIcon } from "../../../assets";
import { Button, Table } from "../../../components";
import { useNavigate } from "react-router-dom";
import { URL } from "../../../utils/constants";
import { useScreenSize } from "../../../utils/hooks/useScreen";
const columns: TableColumnsType<any> = [
	{
		title: "Course Category",
		dataIndex: "course_category",
	},
	{
		title: "Course Type",
		dataIndex: "course_type",
	},
	{
		title: "Course Title",
		dataIndex: "course_title",
	},
	{
		title: "Amount",
		dataIndex: "amount",
	},
	{
		title: "Number of Students",
		dataIndex: "number_of_students",
	},
	{
		title: "Date",
		dataIndex: "date",
	},
];
const data: any[] = [];
for (let i = 0; i < 50; i++) {
	data.push({
		key: i,
		course_category: `Learning Development`,
		course_type: "Agriculture",
		course_title: "Introduction to Bee Farming",
		amount: `${i * 50}$`,
		number_of_students: `${i * 10}`,
		date: "2022-01-01 5:00pm",
	});
}
const Courses: React.FC = () => {
	const nav = useNavigate();
	const isMobile = useScreenSize();
	return (
		<Layout title="Courses" hasMargin={!isMobile} isAdmin>
			<Card className="my-4 p-3 course_card">
				<header className="flex justify-between items-center">
					<div className="flex items-baseline gap-4">
						<h2 className="text-[16px] inter-bold">{data?.length} Courses</h2>

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

export default Courses;
