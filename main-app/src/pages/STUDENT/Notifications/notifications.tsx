import React from "react";
import Layout from "../../Layout";
import { avatar, IndicatorIcon, MarkIcon } from "../../../assets";

const Notification: React.FC<any> = () => {
	return (
		<Layout>
			<div className="w-4/5 mx-auto notifications">
				<div className="flex justify-between">
					<h1 className="text-[20px] font-semibold">Notifications</h1>
					<div className="flex gap-2 items-center text-[#581A57] text-[16px]">
						<MarkIcon />
						<span>Mark all as read</span>
					</div>
				</div>

				<div className="w-4/5 mx-auto">
					<h2 className="text-[16px] font-medium my-[30px]">Today</h2>
					<div className="bg-white p-3 rounded-md my-2">
						<div className="flex justify-between">
							<div className="flex gap-2 items-center">
								<IndicatorIcon />
								<img src={avatar} alt=".." width={60} />
								<p className="p-[16px]">
									Lorem ipsum dolor sit amet consectetur. Ultricies quis nec dui
									diam.
								</p>
							</div>
							<div className="flex flex-col text-right gap-3 text-[#808080] text-[12px]">
								<p>12 Nov.2023</p>
								<p>7:50am</p>
							</div>
						</div>
					</div>
					<div className="bg-white p-3 rounded-md my-2">
						<div className="flex justify-between">
							<div className="flex gap-2 items-center">
								<IndicatorIcon />
								<img src={avatar} alt=".." width={60} />
								<p className="p-[16px]">
									Lorem ipsum dolor sit amet consectetur. Ultricies quis nec dui
									diam.
								</p>
							</div>
							<div className="flex flex-col text-right gap-3 text-[#808080] text-[12px]">
								<p>12 Nov.2023</p>
								<p>7:50am</p>
							</div>
						</div>
					</div>
					<div className="bg-white p-3 rounded-md my-2">
						<div className="flex justify-between">
							<div className="flex gap-2 items-center">
								<IndicatorIcon />
								<img src={avatar} alt=".." width={60} />
								<p className="p-[16px]">
									Lorem ipsum dolor sit amet consectetur. Ultricies quis nec dui
									diam.
								</p>
							</div>
							<div className="flex flex-col text-right gap-3 text-[#808080] text-[12px]">
								<p>12 Nov.2023</p>
								<p>7:50am</p>
							</div>
						</div>
					</div>
				</div>

				<div className="w-4/5 mx-auto">
					<h2 className="text-[16px] font-medium my-[30px]">Recent</h2>
					<div className="bg-white p-3 rounded-md my-2">
						<div className="flex justify-between">
							<div className="flex gap-2 items-center">
								<IndicatorIcon />
								<img src={avatar} alt=".." width={60} />
								<p className="p-[16px]">
									Lorem ipsum dolor sit amet consectetur. Ultricies quis nec dui
									diam.
								</p>
							</div>
							<div className="flex flex-col text-right gap-3 text-[#808080] text-[12px]">
								<p>12 Nov.2023</p>
								<p>7:50am</p>
							</div>
						</div>
					</div>
					<div className="bg-white p-3 rounded-md my-2">
						<div className="flex justify-between">
							<div className="flex gap-2 items-center">
								<IndicatorIcon />
								<img src={avatar} alt=".." width={60} />
								<p className="p-[16px]">
									Lorem ipsum dolor sit amet consectetur. Ultricies quis nec dui
									diam.
								</p>
							</div>
							<div className="flex flex-col text-right gap-3 text-[#808080] text-[12px]">
								<p>12 Nov.2023</p>
								<p>7:50am</p>
							</div>
						</div>
					</div>
					<div className="bg-white p-3 rounded-md my-2">
						<div className="flex justify-between">
							<div className="flex gap-2 items-center">
								<IndicatorIcon />
								<img src={avatar} alt=".." width={60} />
								<p className="p-[16px]">
									Lorem ipsum dolor sit amet consectetur. Ultricies quis nec dui
									diam.
								</p>
							</div>
							<div className="flex flex-col text-right gap-3 text-[#808080] text-[12px]">
								<p>12 Nov.2023</p>
								<p>7:50am</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Notification;
