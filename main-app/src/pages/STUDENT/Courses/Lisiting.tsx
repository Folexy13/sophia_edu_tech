import React from "react";
import Layout from "../../Layout";
import { Col, Input, Row } from "antd";
import { Select } from "antd";
import "./courses.scss";
import { Card } from "../../../components";
import { LearningImg, SocialImg } from "../../../assets";
import { useLocation, useNavigate } from "react-router-dom";
import { URL } from "../../../utils/constants";

const { Option } = Select;

const ListingPage: React.FC<any> = () => {
	function handleChange(value: any) {
		console.log(`Selected: ${value}`);
	}
	const nav = useNavigate();
	const { state } = useLocation();
	return (
		<Layout>
			<div className="courses">
				<img
					src={state == "social" ? SocialImg : LearningImg}
					className="w-full sm:h-[332px]"
				/>
				<div className="px-[10px] sm:px-[30px] py-10 w-[100%] sm:w-[95%] mx-auto">
					<div className="flex justify-between">
						<h3 className="text-[20px] font-semibold font-inter">
							Enrolled Course
						</h3>

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
								className="text-black w-[200px] bg-transparent sm:w-[300px] rounded-2xl p-2 ml-[12px] md:ml-0 md:p-[7px] hidden sm:block"
							/>
						</div>
					</div>
					<Row gutter={[16, 16]} className="my-4 sm:flex-row flex-col ">
						{Array(3)
							.fill("*")
							.map((_, index) => (
								<Col
									key={index}
									className="gutter-row"
									xs={24} // Full width on extra small screens (1 column)
									sm={12} // Half width on small screens (2 columns)
									md={8} // One-third width on medium screens (3 columns)
								>
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
										isSubscribed
									/>
								</Col>
							))}
					</Row>
					<h3 className="text-[20px] font-semibold">
						Applied Science{" "}
						<span className="text-[#808080]"> {">"} Agriculture</span>
					</h3>

					<Row gutter={[16, 16]} className="my-4">
						{Array(18)
							.fill("*")
							.map((_, index) => (
								<Col
									key={index}
									className="gutter-row"
									xs={24} // Full width on extra small screens (1 column)
									sm={12} // Half width on small screens (2 columns)
									md={8} // One-third width on medium screens (3 columns)
								>
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
										onClick={() => nav(URL.ABOUTCOURSE + index + 1)}
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
