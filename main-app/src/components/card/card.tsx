import React from "react";
import { Avatar, Card } from "antd";
import { Button } from "..";

const { Meta } = Card;

const Container: React.FC = () => (
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
			title="ALUKO FOLAJIMI"
			description="Instructor"
			className="text-center mt-[10px]"
		/>
		{/* Description */}
		<p className="text-center">
			Lorem ipsum dolor sit amet consectetur. Purus id etiam turpis nisl viverra
			ut.
		</p>
		{/* Footer */}
		<div className="mt-[22px] flex justify-between">
			<p className="text-[#121212] text-[18px]">
				Price <span className="text-black"> $15</span>
			</p>
			<Button
				label="Subscribe"
				className="bg-[#581A57] text-white p-3 w-[100px]"
			/>
		</div>
	</Card>
);

export default Container;
