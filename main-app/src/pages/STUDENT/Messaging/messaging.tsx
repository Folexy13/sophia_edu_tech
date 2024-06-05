import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import InfiniteScroll from "react-infinite-scroll-component";
import { avatar, IndicatorIcon, PenIcon } from "../../../assets";
import "./messaging.styles.scss";

const Messaging: React.FC<any> = () => {
	const [messages, setMessages] = useState([
		{
			id: 1,
			text: "Lorem ipsum dolor sit amet consectetur. Purus id etiam turpis nisl viverra ut.",
			time: "Friday at 5 : 24 PM",
			sender: "self",
		},
		{
			id: 2,
			text: "Lorem ipsum dolor sit amet consectetur. Purus id etiam turpis nisl viverra ut.",
			time: "Friday at 5 : 24 PM",
			sender: "other",
		},
	]);

	const [hasMore, setHasMore] = useState(true);

	const fetchMoreData = () => {
		// Simulate an API call to fetch more messages
		setTimeout(() => {
			const moreMessages = [
				{
					id: messages.length + 1,
					text: "New message content.",
					time: "Today at 3:45 PM",
					sender: "self",
				},
				{
					id: messages.length + 2,
					text: "Another new message content.",
					time: "Today at 3:46 PM",
					sender: "other",
				},
			];
			setMessages((prevMessages) => [...prevMessages, ...moreMessages]);

			// Example condition to stop fetching more data
			if (messages.length + moreMessages.length >= 20) {
				setHasMore(false);
			}
		}, 1500);
	};

	useEffect(() => {
		// Initial fetch
		fetchMoreData();
	}, [messages]);

	return (
		<Layout className="">
			<div className="px-[40px] messaging">
				<div className="bg-white p-[15px]  h-[700px] text-clip flex gap-2 rounded-lg min-h-[500px] w-[95%] mx-auto">
					<div className="w-[25%] overflow-auto border-[#DBDBDB] border-r pr-[10px]">
						<div className="flex justify-between mb-[15px]">
							<h2 className="font-semibold text-[20px]">All Messages</h2>
							<PenIcon className="cursor-pointer" />
						</div>
						<div className="flex gap-3 items-start mb-[15px]">
							<div className="relative">
								<img src={avatar} width={40} alt="" />
								<IndicatorIcon
									color={"#2E7D32"}
									className="absolute right-[0px] bottom-[6px]"
								/>
							</div>
							<div className="flex justify-between w-full items-start">
								<div>
									<h2 className="text-[16px] ">Temitope Fabiyi</h2>
									<p className="text-[#808080] text-[14px]">
										Lorem ipsum dolor sit amet consectetur. Purus id etiam
										turpis nisl viverra ut.
									</p>
								</div>
								<div className="flex flex-col text-[#808080] text-[12px] w-2/5 text-right">
									<p>12 Nov,2023</p>
									<p>7:50pm</p>
								</div>
							</div>
						</div>
						<div className="flex gap-3 items-start mb-[15px]">
							<div className="relative">
								<img src={avatar} width={40} alt="" />
								<IndicatorIcon
									color={"#2E7D32"}
									className="absolute right-[0px] bottom-[6px]"
								/>
							</div>
							<div className="flex justify-between w-full items-start">
								<div>
									<h2 className="text-[16px] ">Temitope Fabiyi</h2>
									<p className="text-[#808080] text-[14px]">
										Lorem ipsum dolor sit amet consectetur. Purus id etiam
										turpis nisl viverra ut.
									</p>
								</div>
								<div className="flex flex-col text-[#808080] text-[12px] w-2/5 text-right">
									<p>12 Nov,2023</p>
									<p>7:50pm</p>
								</div>
							</div>
						</div>
						<div className="flex gap-3 items-start mb-[15px]">
							<div className="relative">
								<img src={avatar} width={40} alt="" />
								<IndicatorIcon
									color={"#2E7D32"}
									className="absolute right-[0px] bottom-[6px]"
								/>
							</div>
							<div className="flex justify-between w-full items-start">
								<div>
									<h2 className="text-[16px] ">Temitope Fabiyi</h2>
									<p className="text-[#808080] text-[14px]">
										Lorem ipsum dolor sit amet consectetur. Purus id etiam
										turpis nisl viverra ut.
									</p>
								</div>
								<div className="flex flex-col text-[#808080] text-[12px] w-2/5 text-right">
									<p>12 Nov,2023</p>
									<p>7:50pm</p>
								</div>
							</div>
						</div>
					</div>
					<div className="w-[75%] p-3">
						{/* Header */}
						<header className="flex gap-3 items-center border-[#DBDBDB] border-b pb-[10px]">
							<img src={avatar} width={50} />
							<p>Temitope Fabiyi</p>
						</header>

						{/* Message body */}
						<div className="h-full overflow-auto">
							<InfiniteScroll
								dataLength={messages.length}
								next={fetchMoreData}
								hasMore={hasMore}
								loader={<h4>Loading...</h4>}
								endMessage={<p>No more messages</p>}
							>
								{messages.map((message) => (
									<div
										key={message.id}
										className={`flex gap-3 items-start mt-[30px] ${
											message.sender === "self" ? "self" : "other"
										}`}
									>
										{message.sender === "self" && (
											<img src={avatar} width={30} />
										)}
										<div className="w-2/5">
											<p
												className={`${
													message.sender === "self"
														? "bg-[#581A57] text-white"
														: "bg-[#F5F5F5] text-[#581A57]"
												} text-[14px] custom-rounded mb-2 p-2 w-full`}
											>
												{message.text}
											</p>
											<p className="text-[#808080] text-[12px]">
												{message.time}
											</p>
										</div>
									</div>
								))}
							</InfiniteScroll>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Messaging;
