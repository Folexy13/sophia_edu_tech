import React, { useEffect, useRef, useState } from "react";
import Layout from "../../DashboardLayout";
import { Card, Form, Input, TableColumnsType } from "antd";
import { FilterIcon } from "../../../assets";
import { Button, Table } from "../../../components";
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

const Courses: React.FC = () => {
	const { isMobile } = useScreenSize();
	const { onFailure } = useAlert();
	const [loading, setLoading] = useState(false);
	const [courses, setCourses] = useState<any[]>([]);
	const [pagination, setPagination] = useState<{ total?: number, pageSize?: number, current?: number }>({});
	let mounted = useRef(true)
	let dataFetched = useRef(false)

	const columns: TableColumnsType<any> = renderColumns()

	const fetchCourses = async (params: any = {}) => {
		let queryParams = {
			search: "",
			page: params?.current ?? 1,
			per_page: params?.pageSize ?? 10,
		}
		setLoading(true);
		try {
			const response: any = await adminRequests.fetchAllCourse(queryParams);
			if (response && response?.items && Array.isArray(response.items) && mounted.current) {
				setCourses(response?.items ?? []);
				setPagination({
					...pagination,
					total: response.total_items,
					pageSize: response.items_per_page,
					current: response.current_page,
				})
			}
		} catch (error: any) {
			onFailure(error.message);
		} finally {
			setLoading(false);
			dataFetched.current = false
		}
	}

	const tableOnChange = async (pagination: any) => {
		let newPagination = {
			...pagination,
			current: pagination.current,
			pageSize: pagination.pageSize,
			total: pagination.total,
		}
		await fetchCourses(newPagination);
	}

	useEffect(() => {
		mounted.current = true
		if (dataFetched.current) return;

		fetchCourses(pagination);
		dataFetched.current = true

		return () => {
			setCourses([]);
			setPagination({});
			setLoading(false);
			mounted.current = false
		}
	}, [])

	return (
		<Layout title="Courses" hasMargin={!isMobile} isAdmin>
			<Card className="my-4 p-3 course_card">
				<header className="flex justify-between items-center">
					<div className="flex items-baseline gap-4">
						<h2 className="text-[16px] inter-bold">{pagination?.total ?? 0} Courses</h2>

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
					pagination={{ ...pagination, showSizeChanger: true, showTotal: (total: number, range: number[]) => `${range[0]} - ${range[1]} of ${total} Courses` }}
					onChange={tableOnChange}
				/>
			</Card>
		</Layout>
	);
};

export default Courses;
