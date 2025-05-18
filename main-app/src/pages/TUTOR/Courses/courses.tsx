import React, {useEffect, useState} from "react";
import Layout from "../../DashboardLayout";
import {Card, Dropdown, Form, Input, Space, TableColumnsType} from "antd";
import {FilterIcon} from "../../../assets";
import {Button, Table} from "../../../components";
import {useNavigate} from "react-router-dom";
import {URL} from "../../../utils/constants";
import {useScreenSize} from "../../../utils/hooks/useScreen";
import {TutorRequest} from "../../../requests";

interface Course {
    id: number;
    course_category: string;
    course_type: string;
    course_title: string;
    amount: string;
    number_of_students: number;
    date: string;
}

const columns: TableColumnsType<Course> = [
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
    {
        title: "",
        dataIndex: "more",
    },
];

const Courses: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const nav = useNavigate();
    const {isMobile} = useScreenSize();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const response: any = await TutorRequest.fetchMyCourses();
                if (response) {
                    const formattedCourses = response.courses.map((course: any) => ({
                        key: course.id,
                        ...course,
                        more: (
                            <Dropdown menu={{items: getDropdownItems(course.id)}}>
                                <Space className="cursor-pointer">...</Space>
                            </Dropdown>
                        ),
                    }));
                    setCourses(formattedCourses);
                }
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const getDropdownItems = (id: number) => [
        {
            key: "1",
            label: (
                <div
                    className="text-[14px] cursor-pointer"
                    onClick={() => console.log(id)}
                >
                    Edit
                </div>
            ),
        },
        {
            key: "2",
            label: (
                <div
                    className="text-[14px] cursor-pointer"
                    onClick={() => console.log(id)}
                >
                    Delete
                </div>
            ),
        },
    ];

    return (
        <Layout title="Courses" hasMargin={!isMobile}>
            <Card className="my-4 p-3 course_card">
                <header className="flex justify-between items-center">
                    <div className="flex items-baseline gap-4">
                        <h2 className="text-[16px] inter-bold">{courses?.length} Courses</h2>

                        <Form>
                            <Form.Item>
                                <Input
                                    placeholder="Search "
                                    className="px-2 py-3 !outline-none border-[#DBDBDB] border w-[300px] rounded-[50px]"
                                />
                            </Form.Item>
                        </Form>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <FilterIcon/>
                            <p className="text-[#808080] text-[14px] inter-normal">Filter</p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            label="Export"
                            className="text-[#808080] p-3 bg-transparent border-[#808080] border rounded-[5px]"
                        />
                        <Button
                            label="Upload Course"
                            onclick={() => nav(URL.CREATE_COURSE)}
                            className="text-[#fff] p-3 bg-[#581A57]  border rounded-[5px]"
                        />
                    </div>
                </header>

                <Table
                    className="mt-[20px]"
                    columns={columns}
                    data={courses}
                    loading={loading}
                    type={"selection"}
                />
            </Card>
        </Layout>
    );
};

export default Courses;