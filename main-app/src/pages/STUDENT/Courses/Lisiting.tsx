import React from "react";
import Layout from "../../Layout";
import { Col, Input, Row } from "antd";
import { Select } from "antd";
import "./courses.scss";
import { Card } from "../../../components";

const { Option } = Select;

const ListingPage: React.FC<any> = () => {
	function handleChange(value: any) {
		console.log(`Selected: ${value}`);
	}
	return (
		<Layout>
			<div className="courses">
				<div className=" w-full bg-green-700 p-[100px] h-[300px]">H</div>
				<div className="px-[30px] py-10 w-[100%] sm:w-[95%] mx-auto">
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
					<Row gutter={[16, 16]} className="my-4">
						{Array(18)
							.fill("*")
							.map((_, index) => (
								<Col key={index} className="gutter-row" span={8}>
									<Card
										image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTGhAJjvgxShaDTndohHFPFz8sFATlPDhNGA&s"
										name="Aluko Folajimi"
										avatar="https://www.bellanaija.com/wp-content/uploads/2017/05/dreamstime_m_63861851.jpg"
										price="$2000"
										description="Lorem ipsum dolor sit amet, consectetur adipiscing el aspect et status quo et type ullamcorper"
										buttonText="Continue Learning"
										buttonColor="#581A57"
										subject="History"
										buttonLink="..."
									/>
								</Col>
							))}
					</Row>
				</div>
			</div>
		</Layout>
	);
};

export default ListingPage;
