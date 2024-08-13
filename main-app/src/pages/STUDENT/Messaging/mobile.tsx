import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import InfiniteScroll from "react-infinite-scroll-component";
import { avatar, SendArrow } from "../../../assets";
import "./messaging.styles.scss";
import { Button, Form, Input, message } from "antd";
import { useUser } from "../../../store";
import clientRequests from "../../../requests/client.request";

const Messaging: React.FC<any> = () => {
	const { user } = useUser();
	const [messages, setMessages] = useState<any>([
		// {
		// 	id: 1,
		// 	text: "Lorem ipsum dolor sit amet consectetur. Purus id etiam turpis nisl viverra ut.",
		// 	time: "Friday at 5 : 24 PM",
		// 	sender: "self",
		// },
	]);
	const [loading, setLoading] = useState(false);

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

		setMessages(msg);
		// Example condition to stop fetching more data
		setHasMore(false);
	};

	useEffect(() => {
		// Initial fetch
		fetchMoreData();
	}, []);

	return (
		<Layout className="">
			<div className="sm:w-[90%] mt-[-1rem] mx-auto sm:px-[40px] messaging">
				<div className="bg-white py-[15px] px-[5px] mobile  text-clip flex gap-2   w-full md:w-[95%] mx-auto">
					<div className="w-full">
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
											<div className="w-full">
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
