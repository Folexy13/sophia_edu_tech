import React from "react";
import Layout from "../../Layout";
import { truncate } from "lodash";
import {
	AddressLocator,
	avatar,
	CommentIcon,
	DislikeIcon,
	IndicatorIcon,
	LikeIcon,
	LinkIcon,
	PDFIcon,
	ThreeDotsIcon,
	WarningIcon,
} from "../../../assets";
import { Button } from "../../../components";
import { Dropdown, MenuProps, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { URL } from "../../../utils/constants";
import { useUser } from "../../../store";
import { getAvatar } from "../../../utils/helperFunction";

const HomePage: React.FC = () => {
	const nav = useNavigate();
	const { user } = useUser();

	const items: MenuProps["items"] = [
		{
			label: <div>Repost</div>,
			key: "1",
		},
		{
			label: <div onClick={() => nav(URL.MESSAGING)}>Message</div>,
			key: "2",
		},
	];

	const hasEducation = user?.education?.[0];
	const hasLicensesCertifications = user?.licenses_certifications?.[0];

	return (
		<Layout>
			<div className="flex lg:flex-row flex-col px-[10px] lg:px-[80px] gap-4 items-start pb-[20px]">
				{/* First Section */}
				<div className="overflow-y-auto order-1  hidden lg:flex w-full flex-[0.25] min-h-[300px] sm:min-h-[400px] bg-white rounded-lg border-[#B6B6B6] border flex-col items-center justify-center">
					{/* Profile image */}
					<img
						src={getAvatar(user?.profile_image)}
						alt="Profile"
						className="w-[50px] sm:w-[84px] sm:mt-0 mt-[-40px]"
						style={{ borderRadius: "50%" }}
					/>
					<p className="font-semibold text-[16px] font-inter leading-[25.89px]">
						{user?.full_name}
					</p>
					<p className="text-[#808080] text-[14px] my-[10px] flex gap-2 items-center">
						<AddressLocator />
						<span className="text-[14px] font-inter leading-[22.4px]">
							Location
						</span>
					</p>
					{hasEducation && (
						<>
							{hasEducation.degree && (
								<p className="text-[#666666] font-normal font-inter text-[16px] leading-[25px] my-[10px]">
									{hasEducation.degree}
								</p>
							)}
							{hasEducation.field_of_study && (
								<p className="text-[#666666] font-normal font-inter text-[16px] leading-[25px] my-[10px]">
									{truncate(hasEducation.field_of_study, { length: 20 })}
								</p>
							)}
						</>
					)}

					{hasLicensesCertifications && (
						<p className="text-[#666666] font-normal font-inter text-[16px] leading-[25px] my-[10px]">
							{truncate(hasLicensesCertifications.name, { length: 20 })}
						</p>
					)}

					<Button
						label="View Profile"
						onclick={() => nav(URL.BIO)} // Corrected from onclick to onClick
						className="text-white bg-[#581A57] p-3 homepage_btn"
					/>
				</div>

				{/* Second Section */}
				<div className="flex-[0.75] order-3 lg:order-2 w-full sm:max-h-[900px] sm:overflow-y-auto">
					{Array.from({ length: 6 }).map((_, i) => (
						<div
							key={i}
							className="min-h-[200px] bg-white rounded-lg p-2 sm:p-4 mb-[10px]"
						>
							{/* Header */}
							<div className="flex justify-between items-center border-[#F2F2F2] border-b pb-2">
								<div className="flex gap-1 sm:gap-3 items-center">
									<img
										src={avatar}
										alt="User"
										className="w-[30px] sm:w-[40px]"
									/>
									<p className="text-[#581A57] font-inter leading-[25.89px] font-medium text-[12px] sm:text-[16px]">
										Temitope Tiamiyu
									</p>
									<p className="text-[#808080] text-[10px] sm:text-[14px] leading-[22.4px]">
										Uploaded a paper
									</p>
								</div>

								<Dropdown menu={{ items }} trigger={["click"]}>
									<Space>
										<ThreeDotsIcon className="cursor-pointer w-[16px] sm:w-[24px]" />
									</Space>
								</Dropdown>
							</div>

							{/* Body */}
							<div className="flex items-center my-[10px] border-[#F2F2F2] border-b pb-2">
								<div>
									<p className="leading-[25.6px] playfair-display-normal text-[16px] sm:text-[18px]">
										Lorem ipsum dolor sit amet consectetur.
									</p>
									<p className="text-[12px] leading-[25.89px] font-inter sm:text-[16px] text-[#666666]">
										Lorem ipsum dolor sit amet consectetur. Neque turpis etiam
										suspendisse arcu ridiculus vel. Tempus eget in sed tortor.
										Lorem ipsum dolor sit amet consectetur. Neque turpis etiam
										suspendisse arcu ridiculus{" "}
										<span className="text-[#581a57] cursor-pointer">
											see more
										</span>
									</p>

									<div className="flex gap-2 sm:gap-4">
										<p className="text-[10px] sm:text-[12px] items-center my-[10px] flex gap-1 text-[#581A57]">
											<LinkIcon />
											<span>link.com</span>
										</p>
										<p className="text-[10px] sm:text-[12px] items-center my-[10px] flex gap-1 text-[#581A57]">
											<WarningIcon />
											<span>DOI</span>
										</p>
									</div>
								</div>
								<div>
									<PDFIcon className="w-[40px] sm:w-[61px]" />
								</div>
							</div>

							{/* Footer */}
							<div className="flex justify-between items-center text-[xx-small] sm:text-[small]">
								<div className="flex gap-1 sm:gap-2 items-center ">
									<p className="flex flex-col sm:flex-row font-inter font-[300] leading-[12.1px] text-[10px] gap-1 sm:gap-2 items-center">
										<LikeIcon className="w-[10px] sm:w-[12px]" />
										<span>Upvote</span>
									</p>

									<p className="flex flex-col sm:flex-row font-inter font-[300] leading-[12.1px] text-[10px] gap-1 sm:gap-2 items-center">
										<DislikeIcon className="w-[10px] sm:w-[12px]" />
										<span>Downvote</span>
									</p>
									<p className="flex flex-col sm:flex-row font-inter font-[300] leading-[12.1px] text-[10px] gap-1 sm:gap-2 items-center">
										<CommentIcon className="w-[10px] sm:w-[12px]" />
										<span>Comment</span>
									</p>
								</div>

								<div className="flex  gap-1 sm:gap-2 items-center">
									<p className="flex flex-col sm:flex-row font-inter font-[300] leading-[12.1px] text-[10px] gap-1 sm:gap-2 items-center">
										<span
											style={{ visibility: "hidden" }}
											className="sm:!hidden"
										>
											<IndicatorIcon color="#2D2D2D" />
										</span>
										<span> 10 Upvote</span>
									</p>

									<p className="flex flex-col sm:flex-row font-inter font-[300] leading-[12.1px] text-[10px] gap-1 sm:gap-2 items-center">
										<IndicatorIcon color="#2D2D2D" />
										<span>100 Downvote</span>
									</p>
									<p className="flex flex-col sm:flex-row font-inter font-[300] leading-[12.1px] text-[10px] gap-1 sm:gap-2 items-center">
										<IndicatorIcon color="#2D2D2D" />
										<span>100 Comments</span>
									</p>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Third Section */}
				<div className="sm:overflow-y-auto order-2 lg:order-3 w-full lg:w-fit sm:flex-[0.25] sm:max-h-[500px] p-2 rounded-lg bg-white">
					<h2 className="text-[14px] leading-[32px] sm:text-[20px] font-inter border-[#F2F2F2] border-b pb-2 mb-2">
						Recently Read
					</h2>
					{Array.from({ length: 6 }).map((_, i) => (
						<div
							className="bg-[#F5F5F5] p-2 rounded-sm mb-2 cursor-pointer"
							key={i}
						>
							<p className="playfair-display-normal text-[#121212] leading-[25.6px] text-[14px] sm:text-[16px]">
								Lorem ipsum dolor sit amet consectetur. Pretium scelerisque
								velit sollicitudin id.
							</p>
							<p className="text-[#808080] text-[14px] font-inter leading-[22.4px]">
								Aluko Opeyemi
							</p>
							<p className="text-[#808080] text-[14px] font-inter leading-[22.4px]">
								2014
							</p>
						</div>
					))}
				</div>
			</div>
		</Layout>
	);
};

export default HomePage;
