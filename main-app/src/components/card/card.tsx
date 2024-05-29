import React from "react";
import { Avatar, Card, Progress } from "antd";
import { Button } from "..";

const { Meta } = Card;

interface ICardProps {
	name: string;
	description: string;
	image: string;
	subject: string;
	isSubscribed?: boolean;
	avatar: string;
	price: string;
	buttonText: string;
	buttonLink: string;
	buttonColor: string;
}

const Container: React.FC<any> = ({
	name,
	image,
	price,
	avatar,
	description,
	buttonText,
	buttonColor,
	isSubscribed,
	buttonLink,
}) => (
	<Card
		hoverable
		className="w-[100%] p-3 bg-white"
		cover={
			<div className="relative">
				{/* Background Image */}
				<img
					alt="example"
					src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
					className="h-[150px] w-full object-cover rounded-[50%] "
				/>
				{/* Avatar */}
				<Avatar
					size={64}
					src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
					className="mb-3 absolute border-4 border-solid border-white left-1/2 transform -translate-x-1/2 -translate-y-1/2"
				/>
			</div>
		}
	>
		{/* Content */}
		<Meta
			title={name}
			description="Instructor"
			className="text-center mt-[10px]"
		/>
		{/* Description */}
		<p className="text-center">
			Lorem ipsum dolor sit amet consectetur. Purus id etiam turpis nisl viverra
			ut.
		</p>

		{!isSubscribed ? (
			<>
				<Progress
					showInfo={false}
					strokeColor="#581A57"
					className="py-[12px]"
					percent={60}
				/>
				{/* Footer */}
				<Button
					block
					label="Continue learning"
					className="bg-[#581A57] text-white p-3 w-[100px]"
				/>
			</>
		) : (
			<div className="mt-[22px] flex justify-between">
				<p className="text-[#121212] text-[18px]">
					Price <span className="text-black"> $15</span>
				</p>
				<Button
					label="Subscribe"
					className="bg-[#581A57] text-white p-3 w-[100px]"
				/>
			</div>
		)}
	</Card>
);

export default Container;
