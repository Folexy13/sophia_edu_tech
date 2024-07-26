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
// import { Modal } from "../../../components";
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
	return (
		<Layout>
			{/* <Modal isOpen={true} /> */}
			<div className="flex px-[80px]  gap-4 items-start pb-[20px]">
				{/* First Section */}
				<div className="overflow-y-auto flex-[0.25] min-h-[400px] bg-white rounded-lg border-[#B6B6B6] border flex flex-col items-center justify-center">
					{/* profile image */}
					<img
						src={getAvatar(user?.profile_image)}
						alt="profile_image"
						width={100}
						style={{ borderRadius: "50%" }}
					/>
					<p className="font-semibold text-[16px]">{user?.full_name}</p>
					<p className="text-[#808080] text-[14px] my-[10px] flex gap-2 items-center">
						<AddressLocator />
						<span>Location</span>
					</p>
					<p className="text-[#666666] font-normal  text-[16px] leading-[25px] my-[10px]">
						{user &&
							user.education &&
							user.education[0] &&
							user.education[0].degree}
					</p>
					<p className="text-[#666666] font-normal  text-[16px] leading-[25px] my-[10px]">
						{user &&
							user.education &&
							user.education[0] &&
							truncate(user.education[0].field_of_study, { length: 20 })}
					</p>
					<p className="text-[#666666] font-normal  text-[16px] leading-[25px] my-[10px]">
						{user &&
							user.licenses_certifications &&
							user.licenses_certifications[0] &&
							truncate(user.licenses_certifications[0].name, {
								length: 20,
							})}
					</p>

					<Button
						label="View Profile"
						onclick={() => nav(URL.BIO)}
						className="text-white bg-[#581A57] p-3 homepage_btn"
					/>
				</div>
				{/* Second Section */}
				<div className="flex-[0.75] max-h-[900px] overflow-y-auto">
					{Array(6)
						.fill(null)
						.map((_, i: number) => {
							return (
								<div
									key={i}
									className="min-h-[200px] bg-white rounded-lg p-4 mb-[10px]"
								>
									{/* Header */}
									<div className="flex justify-between items-center border-[#F2F2F2] border-b pb-2">
										<div className="flex gap-3 items-center ">
											<img src={avatar} alt="..." width={50} />
											<p className=" text-[#581A57] font-medium text-[16px]">
												Temitope Tiamiyu
											</p>
											<p className="text-[#808080] text-[14px]">
												Uploaded a paper
											</p>
										</div>

										<Dropdown menu={{ items }} trigger={["click"]}>
											<Space>
												<ThreeDotsIcon className="cursor-pointer" />
											</Space>
										</Dropdown>
									</div>
									{/* Body */}
									<div className="flex items-center my-[10px] border-[#F2F2F2] border-b pb-2">
										<div className="">
											<p className="my-[10px] text-[18px]">
												Lorem ipsum dolor sit amet consectetur.
											</p>
											<p className="text-[16px] text-[#666666]">
												Lorem ipsum dolor sit amet consectetur. Neque turpis
												etiam suspendisse arcu ridiculus vel. Tempus eget in sed
												tortor. Lorem ipsum dolor sit amet consectetur. Neque
												turpis etiam suspendisse arcu ridiculus{" "}
												<span className="text-[#581a57] cursor-pointer">
													see more
												</span>
											</p>

											<div className="flex gap-4">
												<p className="text-[12px] my-[10px] flex gap-1 text-[#581A57]">
													<LinkIcon />
													<span>link.com</span>
												</p>
												<p className="text-[12px] my-[10px] flex gap-1 text-[#581A57]">
													<WarningIcon />
													<span>DOI</span>
												</p>
											</div>
										</div>
										<div className="">
											<PDFIcon />
										</div>
									</div>
									{/* Footer */}
									<div className="flex justify-between items-center">
										<div className="flex gap-3 items-center">
											<p className="flex gap-2 items-center">
												<LikeIcon />
												<p>Upvote</p>
											</p>

											<p className="flex gap-2 items-center">
												<DislikeIcon />
												<p>Downvote</p>
											</p>
											<p className="flex gap-2 items-center">
												<CommentIcon />
												<p>Comment</p>
											</p>
										</div>

										<div className="flex gap-3 items-center">
											<p className="">10 Upvote</p>

											<p className="flex gap-2 items-center">
												<IndicatorIcon color="#2D2D2D" />
												<p>100 Downvote</p>
											</p>
											<p className="flex gap-2 items-center">
												<IndicatorIcon color="#2D2D2D" />
												<p>100 Comments</p>
											</p>
										</div>
									</div>
								</div>
							);
						})}
				</div>
				{/* Third Section */}
				<div className="overflow-y-auto flex-[0.25] max-h-[900px] p-2 rounded-lg bg-white">
					<h2 className="text-[20px] border-[#F2F2F2] border-b pb-2 mb-3">
						Recently Read
					</h2>
					{Array(4)
						.fill(null)
						.map((_, i: number) => {
							return (
								<div
									className="bg-[#F5F5F5] p-2 rounded-sm mb-2 cursor-pointer"
									key={i}
								>
									<p className="playfair-display-normal text-[18px]">
										Lorem ipsum dolor sit amet consectetur. Pretium scelerisque
										velit sollicitudin id.
									</p>
									<p className="text-[#808080] text-[14px]">Aluko Opeyemi</p>
									<p className="text-[#808080] text-[14px]">2014</p>
								</div>
							);
						})}
				</div>
			</div>
		</Layout>
	);
};

export default HomePage;
