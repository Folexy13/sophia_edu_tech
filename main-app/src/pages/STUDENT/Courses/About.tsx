import React, { useState } from "react";
import Layout from "../../Layout";
import { Collapse, CollapseProps, Form, Input, Rate } from "antd";
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
import { Button, Modal } from "../../../components";

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
	const [open, setOpen] = useState(false);
	const [buttonLoading, setButtonLoading] = useState({
		firstBtn: false,
		secondBtn: false,
	});

	const handleTopUpWallet = () => {
		setButtonLoading({
			firstBtn: !buttonLoading.firstBtn,
			secondBtn: buttonLoading.secondBtn,
		});
		setTimeout(() => {
			setButtonLoading({ firstBtn: false, secondBtn: buttonLoading.secondBtn });
			setOpen(false);
		}, 2000);
	};
	const handlePayWithWallet = () => {
		setButtonLoading({
			firstBtn: buttonLoading.firstBtn,
			secondBtn: !buttonLoading.secondBtn,
		});
		setTimeout(() => {
			setButtonLoading({ firstBtn: buttonLoading.firstBtn, secondBtn: false });
			setOpen(false);
		}, 2000);
	};
	const expandIcon = (panelProps: any) =>
		panelProps.isActive ? <ArrowUpOutlined size={36} /> : <ArrowDownOutlined />;
	return (
		<Layout>
			<div className="mb-[80px] about_course px-[10px] sm:px-[30px] py-1 sm:py-10 w-[100%] sm:w-[95%] mx-auto flex md:flex-row flex-col justify-between gap-2">
				<div className="w-full md:w-1/2 order-1">
					<h1 className="font-semibold text-[18px] sm:text-[24px] mb-[20px] font-inter">
						About the Course
					</h1>
					<div className="flex mb-[20px]">
						<p className="font-semibold text-[16px] font-inter sm:text-[20px] text-[#581A57] ">
							Applied Science {">"}
						</p>
						<p className=" text-[16px] font-inter sm:text-[20px] text-[#581A57] ">
							Agriculture {">"}
						</p>
						<p className=" text-[16px] font-inter sm:text-[20px] text-[#581A57] ">
							History
						</p>
					</div>

					<p className="text-[16px] font-inter sm:text-[20px] my-[30px] leading-[32px] inter-normal">
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
					<div className="relative">
						{/* Background Image with Transparency */}
						<img
							alt="example"
							src={
								"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTGhAJjvgxShaDTndohHFPFz8sFATlPDhNGA&s"
							}
							className="my-[30px] h-[165px] sm:h-[209px] w-full object-cover rounded-md"
						/>
						{/* Black Overlay */}
						<div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
						{/* Centered Course Subject */}
						<div className="absolute inset-0 flex items-center justify-center">
							<span className="text-white font-bold text-lg font-inte">
								{"History"}
							</span>
						</div>
					</div>
					{/* <img
						alt="example"
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTGhAJjvgxShaDTndohHFPFz8sFATlPDhNGA&s"
						className="my-[30px] h-[209px] w-full object-cover rounded-[10px]"
					/> */}
					<div>
						<h1 className="text-[20px] my-[30px] font-semibold order-3">
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

				<div className="w-full md:w-[500px] order-2">
					<div className="w-full md:w-[500px] bg-[#F5F5F5] rounded-xl p-6">
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
								onclick={() => setOpen(true)}
							/>
						</div>
					</div>
				</div>
			</div>
			<Modal
				isOpen={open}
				onClose={() => setOpen(!open)}
				className="card-modal"
				title="Proceed to Payment"
				cancelText="Top Up Wallet"
				okText="Pay with wallet"
			>
				<Form layout="vertical">
					<Form.Item label="Course Title">
						<Input name="course" placeholder="Enter your Course of Choice" />
					</Form.Item>
					<Form.Item label="Amount">
						<Input name="amount" placeholder="$15" />
					</Form.Item>
				</Form>
				<div style={{ marginTop: "20px", textAlign: "right" }}>
					<Button
						loading={buttonLoading.secondBtn === true}
						onclick={handlePayWithWallet}
						label="Pay with wallet"
						className="mr-[10px] p-[8px] bg-[#581A57] text-white"
					/>
					<Button
						onclick={handleTopUpWallet}
						loading={buttonLoading.firstBtn === true}
						label="Top up wallet"
						className="text-[#581A57] p-[8px] bg-[#E6DDE6]"
					/>
				</div>
			</Modal>
		</Layout>
	);
};

export default AboutPage;
