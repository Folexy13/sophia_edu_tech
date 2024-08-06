import React from "react";
import Layout from "../../Layout";
import { avatar, IndicatorIcon, MarkIcon } from "../../../assets";

const Notification: React.FC<any> = () => {
	return (
		<Layout>
			<div className="w-[90%] sm:w-4/5 mx-auto notifications">
				<div className="flex justify-between">
					<h1 className="text-[20px] font-semibold font-inter leading-[32px]">
						Notifications
					</h1>
					<div className="flex gap-2 items-center text-[#581A57] text-[14px] font-inter sm:text-[16px]">
						<MarkIcon />
						<span>Mark all as read</span>
					</div>
				</div>

				{/* Today Notification */}

				<div className="sm:w-4/5 mx-auto">
					<h2 className="text-[16px] font-medium my-[30px] font-inter">
						Today
					</h2>
					{Array(3)
						.fill("#")
						.map((_, i) => {
							return (
								<div key={i} className="bg-white p-3 rounded-md my-2">
									<div className="flex justify-between items-start sm:items-start">
										<div className=" flex-1 flex gap-2 items-start sm:items-center">
											<IndicatorIcon className="mt-[13px] sm:mt-0" />
											<img
												src={avatar}
												alt=".."
												className="w-[40px] sm:w-[60px]"
											/>
											<div>
												<p className="sm:p-[16px] text-[14px] sm:pb-1 font-inter">
													Lorem ipsum dolor sit amet consectetur.
												</p>
												<p className="sm:px-[16px]  font-inter text-[#581A57] text-[14px]">
													Ultricies quis nec dui diam.
												</p>
											</div>
										</div>
										<div className="flex flex-col text-right gap-0 sm:gap-3 font-[300] text-[#808080] text-[12px]">
											<p>12 Nov.2023</p>
											<p>7:50am</p>
										</div>
									</div>
								</div>
							);
						})}
				</div>

				{/* Recent Notifictaions */}

				<div className="sm:w-4/5 mx-auto mb-[200px] sm:mb-0">
					<h2 className="text-[16px] font-medium my-[30px]">Recent</h2>
					{Array(3)
						.fill("#")
						.map((_, i) => {
							return (
								<div key={i} className="bg-white p-3 rounded-md my-2">
									<div className="flex justify-between items-start sm:items-start">
										<div className=" flex-1 flex gap-2 items-start sm:items-center">
											<IndicatorIcon className="mt-[13px] sm:mt-0" />
											<img
												src={avatar}
												alt=".."
												className="w-[40px] sm:w-[60px]"
											/>
											<div>
												<p className="sm:p-[16px] text-[14px] sm:pb-1 ">
													Lorem ipsum dolor sit amet consectetur.
												</p>
												<p className="sm:px-[16px] text-[14px] text-[#581A57] text-[14px]">
													Ultricies quis nec dui diam.
												</p>
											</div>
										</div>
										<div className="flex flex-col text-right gap-1 sm:gap-3 text-[#808080] text-[12px]">
											<p>12 Nov.2023</p>
											<p>7:50am</p>
										</div>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</Layout>
	);
};

export default Notification;
