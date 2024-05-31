import React from "react";
import Layout from "../../Layout";
import { Collapse, CollapseProps, Rate } from "antd";
import "./courses.scss"; // Import the custom CSS
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import {
	AudioIcon,
	CertificateIcon,
	CircleHeartIcon,
	DiscIcon,
	LaptopIcon,
	OpenBookIcon,
	SmileyIcon,
} from "../../../assets";
import { Button } from "../../../components";

const AboutPage: React.FC<any> = () => {
	const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

	const items: CollapseProps["items"] = [
		{
			key: "1",
			label: "Module 1",
			children: <p>{text}</p>,
		},
	];
	const onChange = (key: string | string[]) => {
		console.log(key);
	};
	const expandIcon = (panelProps: any) =>
		panelProps.isActive ? <ArrowUpOutlined size={36} /> : <ArrowDownOutlined />;
	return (
		<Layout>
			<div className="about_course px-[30px] py-10 w-[100%] sm:w-[95%] mx-auto flex justify-between gap-2">
				<div className="w-1/2">
					<h1 className="font-semibold text-[24px] mb-[20px]">
						About the Course
					</h1>
					<div className="flex mb-[20px]">
						<p className="font-semibold text-[20px] text-[#581A57] ">
							Applied Science {">"}
						</p>
						<p className=" text-[20px] text-[#581A57] ">Agriculture {">"}</p>
						<p className=" text-[20px] text-[#581A57] ">History</p>
					</div>

					<p className="text-[20px] my-[30px]">
						This course lorem ipsum dolor sit amet consectetur. Eu mi pulvinar
						risus dapibus eget. Malesuada auctor a elementum mollis justo enim
						nisi nullam nisl. Fringilla proin aenean non tincidunt imperdiet.
						Tellus egestas purus sit fermentum.
					</p>
					<div className="flex gap-3 my-[30px]">
						<p className="text-[16px]">4.5 Ratings (1500 Students)</p>
						<Rate defaultValue={3} />
					</div>
					<div className="flex gap-2 my-[30px]">
						<p className="text-[#737373]">Instructor:</p>
						<p>Aluko Folajimi</p>
					</div>
					<img
						alt="example"
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTGhAJjvgxShaDTndohHFPFz8sFATlPDhNGA&s"
						className="my-[30px] h-[209px] w-full object-cover rounded-[10px]"
					/>
					<div>
						<h1 className="text-[20px] my-[30px] font-semibold">
							Course Content
						</h1>
						<Collapse
							onChange={onChange}
							items={items}
							accordion
							className="custom-collapse"
							expandIcon={expandIcon} // Add custom icon
						/>
						<Collapse
							onChange={onChange}
							items={items}
							accordion
							className="custom-collapse"
							expandIcon={expandIcon} // Add custom icon
						/>
					</div>
				</div>

				<div className="w[500px]">
					<div className="w-[500px] bg-[#F5F5F5] rounded-xl p-6">
						<div className="flex gap-2 mb-[20px]">
							<SmileyIcon />
							<p className="text-[#4D4D4D] font-medium">Beginner Friendly</p>
						</div>

						<div className="flex gap-2 mb-[20px]">
							<OpenBookIcon />
							<p className="text-[#4D4D4D] font-medium">
								{" "}
								Additional Resources
							</p>
						</div>

						<div className="flex gap-2 mb-[20px]">
							<LaptopIcon />
							<p className="text-[#4D4D4D] font-medium">Self Paced</p>
						</div>
						<div className="flex gap-2 mb-[20px]">
							<CircleHeartIcon />
							<p className="text-[#4D4D4D] font-medium">
								99% Positive Learning
							</p>
						</div>
						<div className="flex gap-2 mb-[20px]">
							<AudioIcon />
							<p className="text-[#4D4D4D] font-medium">Audio: English</p>
						</div>
						<div className="flex gap-2 mb-[20px]">
							<DiscIcon />
							<p className="text-[#4D4D4D] font-medium">Online</p>
						</div>
						<div className="flex gap-2 mb-[20px]">
							<CertificateIcon />
							<p className="text-[#4D4D4D] font-medium">
								Certificate Available
							</p>
						</div>
						<div className="w-[300px]">
							<Button
								className="bg-[#581A57] text-white"
								block
								label="Subscribe for $15 monthly"
							/>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default AboutPage;
