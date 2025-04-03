import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../DashboardLayout";
import { Card, Form, Input, TableColumnsType } from "antd";
import { FilterIcon } from "../../../assets";
import { Button, Table } from "../../../components";
// import { useNavigate } from "react-router-dom";
import { useScreenSize } from "../../../utils/hooks/useScreen";
import adminRequests from "../../../requests/admin.request";
import { useAlert } from "../../../store";

const renderColumns = () => {
    return [
        {
            title: "Course Category",
            dataIndex: "categories",
            render: (categories: string[]) => (
                <span>{categories.join(', ')}</span>
            ),
        },
        {
            title: "Course Type",
            dataIndex: "course_type",
        },
        {
            title: "Course Title",
            dataIndex: "title",
        },
        {
            title: "Amount",
            dataIndex: "price",
            render: (price: number) => `$${price.toFixed(2)}`,
        },
        {
            title: "No of Students",
            dataIndex: "student_count",
        },
        {
            title: "Date Upload",
            dataIndex: "date_created",
            render: (date: string) => new Date(date).toDateString(),
        },
    ];
};

// const onFilter = () => {};
const Courses: React.FC = () => {
	// const nav = useNavigate();
	const { isMobile } = useScreenSize();
	const [courses, setCourses] = useState<any[]>([]);
	const { onFailure } = useAlert();
	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState<{ total_items?: number, items_per_page?: number, current_page?: number }>({});

	const columns: TableColumnsType<any> = renderColumns()

	const pagination = useMemo(() => ({
		total: tableData?.total_items ?? 0,
		pageSize: tableData?.items_per_page ?? 10,
		current: tableData?.current_page ?? 1,
	}), [tableData])

	useEffect(() => {
		
		const fetchCourses = async () => {
			setLoading(true);
			try {
				const response: any = await adminRequests.fetchAllCourse();
				setTableData(response ?? {});
				setCourses(response?.items ?? []);
			} catch (error: any) {
				onFailure(error.message);
			} finally {
				setLoading(false);
			}
		}

		fetchCourses();

		return () => {
			setCourses([]);
			setTableData({});
			setLoading(false);
		}
	}, [])

	return (
		<Layout title="Courses" hasMargin={!isMobile} isAdmin>
			<Card className="my-4 p-3 course_card">
				<header className="flex justify-between items-center">
					<div className="flex items-baseline gap-4">
						<h2 className="text-[16px] inter-bold">{tableData?.total_items ?? 0} Courses</h2>

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
					data={courses}
					type={"selection"}
					loading={loading}
					pagination={pagination}
				/>
			</Card>
		</Layout>
	);
};

export default Courses;
