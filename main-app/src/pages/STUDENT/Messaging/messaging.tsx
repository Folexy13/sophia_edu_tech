import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import InfiniteScroll from "react-infinite-scroll-component";
import { avatar, IndicatorIcon, PenIcon, SendArrow } from "../../../assets";
import "./messaging.styles.scss";
import { Button, Form, Input, message } from "antd";
import { useUser } from "../../../store";
import clientRequests from "../../../requests/client.request";
import { URL } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";

const Messaging: React.FC<any> = () => {
	const { user } = useUser();
	const [messages, setMessages] = useState<any>([]);
	const [loading, setLoading] = useState(false);
	const nav = useNavigate();

	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	const [hasMore, setHasMore] = useState(true);
	const sendMessage = async (msg: any) => {
		setLoading(true);
		const payload = { recipient_id: 2, content: msg };
		// const testData = {
		// 	content:msg,
		// 	id:
		// }
		try {
			await clientRequests.sendMessage(payload);
			setMessages([...messages, msg]);
			message.success("message sent");
		} catch (error: any) {
			message.error(error.message);
			throw error;
		} finally {
			setLoading(false);
		}
	};
	const fetchMoreData = async () => {
		// Simulate an API call to fetch more messages

		const msg: any = await clientRequests.getMyMessages();

		if(msg.length < 1){

		setMessages(msg);
		}
		// Example condition to stop fetching more data
		setHasMore(false);
	};

	useEffect(() => {
		// Initial fetch
		fetchMoreData();
	}, []);

	return (
		<Layout className="">
			<div className="xl:w-[90%] mx-auto sm:px-[40px] messaging">
				<div className="bg-transparent sm:bg-white p-[15px] cursor-pointer  sm:h-[700px] text-clip flex gap-2 rounded-lg min-h-[500px] w-full md:w-[95%] mx-auto">
					{/* Chat List */}
					<div className="md:w-[25%] lg:w-[30%] overflow-auto border-[#F5F5F5] md:border-r w-full md:pr-[10px]">
						<div className="flex justify-between mb-[15px]">
							<h2 className="font-semibold text-[20px] font-inter">
								All Messages
							</h2>
							<PenIcon className="cursor-pointer" />
						</div>
						{Array(2)
							.fill("1")
							.map((_, key) => {
								return (
									<div
										key={key}
										className="flex gap-3 items-start mb-[15px]"
										onClick={() =>
											isMobile ? nav(URL.MESSAGING + "/" + key + 1) : null
										}
									>
										<div className="relative mt-[10px]">
											<img src={avatar} width={40} alt="" />
											<IndicatorIcon
												color={"#2E7D32"}
												className="absolute right-[0px] bottom-[6px]"
											/>
										</div>
										<div className="flex justify-between  w-full items-start">
											<div>
												<div className="flex justify-between items-center">
													<h2 className="text-[16px] ">Temitope Fabiyi</h2>
													<div className="flex flex-col text-[#808080] text-[12px] max-w-[250px]  text-right">
														<p>12 Nov,2023</p>
														<p>7:50pm</p>
													</div>
												</div>
												<p className="text-[#808080] text-[14px]">
													Lorem ipsum dolor sit amet consectetur. Purus id etiam
													turpis nisl viverra ut.
												</p>
											</div>
										</div>
									</div>
								);
							})}
					</div>
					<div className="md:w-[75%] lg:w-[70%] p-3  hidden md:block">
						{/* Header */}
						<header className="flex gap-3 items-center border-[#F5F5F5] border-b pb-[10px]">
							<img src={avatar} width={50} />
							<p>Temitope Fabiyi</p>
						</header>

						{/* Message body */}
						<div className="msgbody_height relative  w-full">
							<div
								className={`hidden-scrollbar relative h-full ${
									messages.length < 1 && "flex items-center justify-center "
								}`}
							>
								<InfiniteScroll
									dataLength={messages.length}
									next={fetchMoreData}
									hasMore={hasMore}
									className={` ${messages.length < 1 && "mt-[-66px]"}`}
									loader={<h4>Loading...</h4>}
									endMessage={messages.length < 1 && <p>No more messages</p>}
								>
									{messages.map((message: any, i: number) => (
										<div
											key={i}
											className={`flex gap-3 items-start mt-[30px] ${
												message?.other_user_name === user?.full_name
													? "self"
													: "other"
											}`}
										>
											{message?.other_user_name === user?.full_name && (
												<img src={avatar} width={30} />
											)}
											<div className="w-2/5">
												<p
													className={`${
														message?.other_user_name === user?.full_name
															? "bg-[#581A57] text-white"
															: "bg-[#F5F5F5] text-[#581A57]"
													} text-[14px] custom-rounded mb-2 p-2 w-full`}
												>
													{message?.content}
												</p>
												<p className="text-[#808080] text-[12px]">
													{message?.timestamp}
												</p>
											</div>
										</div>
									))}
								</InfiniteScroll>
							</div>
							<Form className="absolute bottom-[30px]  w-full">
								<Input
									className="bg-[#F5F5F5] focus:bg-[#F5F5F5] hover:bg-[#F5F5F5] focus:border-0 hover:border-0  rounded-[50px] px-[19px] py-[15px]"
									name="message"
									placeholder="Type your message here"
								/>
								{!loading ? (
									<SendArrow
										className="bottom-[-1px] right-[17px] absolute cursor-pointer"
										onclick={() =>
											sendMessage(
												"the time is 12:46am,but i think there is a bug somewhere"
											)
										}
									/>
								) : (
									<Button
										loading={true}
										className="bottom-[11px] focus:!bg-transparent hover:!bg-transparent bg-transparent border-0 right-[17px] absolute cursor-pointer"
									/>
								)}
							</Form>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Messaging;
