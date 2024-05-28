import React from "react";
import Layout from "../Layout";
import { Col, Input, Row } from "antd";
import { Select } from "antd";
import "./courses.scss";
import { Card } from "../../components";

const { Option } = Select;

const ListingPage: React.FC<any> = () => {
	function handleChange(value: any) {
		console.log(`Selected: ${value}`);
	}
	return (
		<Layout>
			<div className="courses w-full bg-green-700 p-[100px] h-[300px]">H</div>
			<div className="px-[30px] py-10">
				<div className="flex justify-between">
					<h3 className="text-[20px] font-semibold">Enrolled Course</h3>

					<div className="flex gap-3 items-center">
						<Select
							defaultValue="Sort by"
							className="w-[120px] bg-transparent rounded-3xl h-[38px]"
							onChange={handleChange}
						>
							<Option value="enrolled">Enrolled</Option>
							<Option value="agriculture">Agriculture</Option>
							<Option value="applied_science" disabled>
								Applied Science
							</Option>
						</Select>
						<Input
							placeholder="Search for anything"
							size="large"
							allowClear
							className="text-black w-[200px] bg-transparent sm:w-[300px] rounded-2xl p-2 ml-[12px] md:ml-0 md:p-[7px]"
						/>
					</div>
				</div>
				<Row gutter={16} className="my-4">
					<Col className="gutter-row" span={8}>
						<Card />
					</Col>
					<Col className="gutter-row" span={8}>
						<Card />
					</Col>
					<Col className="gutter-row" span={8}>
						<Card />
					</Col>
				</Row>
			</div>
		</Layout>
	);
};

export default ListingPage;
