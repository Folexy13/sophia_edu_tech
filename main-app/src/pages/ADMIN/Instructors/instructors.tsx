import React, { Fragment, useEffect, useRef, useState } from "react";
import Layout from "../../DashboardLayout";
import { Card, Dropdown, Form, Input, Space, TableColumnsType } from "antd";
import { avatar, FilterIcon } from "../../../assets";
import { Button, Table } from "../../../components";
import { useScreenSize } from "../../../utils/hooks/useScreen";
import { useNavigate } from "react-router-dom";
import { URL } from "../../../utils/constants";
import { AdminRequest } from "../../../requests";
import { useAlert } from "../../../store";

const renderColumns = (nav: Function) => {
    return [
        {
            title: "Instructor Name",
            dataIndex: "full_name",
			render: (full_name: string, record: any) => (
				<div className="flex gap-2 items-center">
					{
						record.profile_image ? (
							<img src={record.profile_image} alt="avatar" width={20} />
						) : (
							<img src={avatar} alt="avatar" width={20} />
						)
					}
					<p>{ full_name }</p>
				</div>
			)
        },
        {
            title: "Courses",
            dataIndex: "courses",
            render: (courses: any) => (
                <Fragment>
                    { courses.map((course: any) => (
						<span className="block" key={course.id}>{ course.title }</span>
					)) }
                </Fragment>
            )
        },
        {
            title: "Earnings",
            dataIndex: "earnings",
        },
        {
            title: "Date Created",
            dataIndex: "created_at",
        },
        {
            title: "",
            key: "more",
            render: (_: any, record: any) => (
                <Dropdown menu={{ items: [
					{
						key: "1",
						label: (
							<div
								className="text-[14px] cursor-pointer"
								onClick={() => console.log(record)}
							>
								View Info
							</div>
						),
					},
					{
						key: "2",
						label: (
							<div
								className="text-[14px] cursor-pointer"
								onClick={() => nav(`/admin/instructor/${record.id}/students`)}
							>
								View Students
							</div>
						),
					},
				] }}>
                    <Space className="cursor-pointer">...</Space>
                </Dropdown>
            )
        },
    ];
};

const StudentsPage: React.FC = () => {
	const { isMobile } = useScreenSize();
	const [instructors, setInstructors] = useState<any[]>([])
	const [pagination, setPagination] = useState<{ total?: number, pageSize?: number, current?: number }>({});
	const [loading, setLoading] = useState(false)
	const { onFailure } = useAlert();
	const nav = useNavigate();
	let mounted = useRef(true)
	let dataFetched = useRef(false)

	const columns: TableColumnsType<any> = renderColumns(nav)

	const tableOnChange = async (pagination: any) => {
		let newPagination = {
			...pagination,
			current: pagination.current,
			pageSize: pagination.pageSize,
			total: pagination.total,
		}
		await fetchData(newPagination);
	};

	const fetchData = async (params: any = {}) => {
		let queryParams = {
			search: "",
			page: params?.current ?? 1,
			per_page: params?.pageSize ?? 10,
		}
		setLoading(true)
		try {
			const resp: any = await AdminRequest.getInstructors(queryParams);
			if (resp && resp?.items && Array.isArray(resp.items) && mounted.current) {
				setInstructors(resp.items)
				setPagination({
					...pagination,
					total: resp.total_items,
					pageSize: resp.per_page,
					current: resp.current_page,
				})
			}
		} catch (error: any) {
			onFailure(error.message);
		} finally {
			setLoading(false)
			dataFetched.current = false
		}
	};

	useEffect(() => {
		mounted.current = true
		if (dataFetched.current) return;

		fetchData(pagination);
		dataFetched.current = true

		return () => {
			setInstructors([])
			setPagination({})
			setLoading(false)
			mounted.current = false
		}
	}, []);

	return (
		<Layout title="Instructors" hasMargin={!isMobile} isAdmin>
			<Card className="my-4 p-3 course_card">
				<header className="flex justify-between items-center">
					<div className="flex items-baseline gap-4">
						<h2 className="text-[16px] inter-bold">
							{pagination?.total ?? 0} Instructors
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
					data={instructors}
					type={"selection"}
					loading={loading}
					pagination={{ ...pagination, showSizeChanger: true, showTotal: (total: number, range: number[]) => `${range[0]} - ${range[1]} of ${total} Instructors` }}
					onChange={tableOnChange}
				/>
			</Card>
		</Layout>
	);
};

export default StudentsPage;
