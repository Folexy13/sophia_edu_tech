import React, { useState } from "react";
import { Avatar, Card, Form, Input, Progress } from "antd";
import { Button, Modal } from ".."; // Assuming Button is exported from ".."

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

const Container: React.FC<ICardProps> = ({
	name,
	image,
	price,
	avatar,
	description,
	buttonText,
	buttonColor,
	isSubscribed,
	buttonLink,
}) => {
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
	return (
		<Card
			hoverable
			className="w-[100%] p-3 bg-white"
			cover={
				<div className="relative">
					{/* Background Image */}
					<img
						alt="example"
						src={image} // Changed to use image prop
						className="h-[150px] w-full object-cover rounded-[50%]"
					/>
					{/* Avatar */}
					<Avatar
						size={64}
						src={avatar} // Changed to use avatar prop
						className="mb-3 absolute border-4 border-solid border-white left-1/2 transform -translate-x-1/2 -translate-y-1/2"
					/>
				</div>
			}
		>
			{/* Content */}
			<Meta
				title={name}
				description="Instructor" // Fixed static description
				className="text-center mt-[10px]"
			/>
			{/* Description */}
			<p className="text-center">{description}</p>{" "}
			{/* Changed to use description prop */}
			{isSubscribed ? (
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
						label={buttonText} // Changed to use buttonText prop
						className={`bg-[${buttonColor}] text-white p-3 w-[100px]`} // Changed to use buttonColor prop
					/>
				</>
			) : (
				<div className="mt-[22px] flex justify-between">
					<p className="text-[#121212] text-[18px]">
						Price <span className="text-black">{price}</span>{" "}
						{/* Changed to use price prop */}
					</p>
					<Button
						label="Subscribe"
						className="bg-[#581A57] text-white p-3 w-[100px]"
						onclick={() => setOpen(true)}
					/>
				</div>
			)}
			<Modal
				isOpen={open}
				onClose={() => setOpen(!open)}
				className="card-modal"
				title="Proceed to Payment"
				cancelText="Top Up Wallet"
				okText="Pay with wallet"
			>
				{" "}
				<Form
					// labelCol={{ span: 4 }}
					// wrapperCol={{ span: 8 }}
					layout="vertical"
				>
					<Form.Item label="Course Title">
						<Input name="course" placeholder="Enter your Course of Choice" />
					</Form.Item>
					<Form.Item label="Amount">
						<Input name="amount" placeholder="$15" />
					</Form.Item>
				</Form>
				<div style={{ marginTop: "20px", textAlign: "right" }}>
					<Button
						label="Pay with wallet"
						loading={buttonLoading.secondBtn === true}
						onclick={handlePayWithWallet}
						className="mr-[10px] p-[8px] bg-[#581A57] text-white"
					/>

					<Button
						label="Top up wallet"
						onclick={handleTopUpWallet}
						loading={buttonLoading.firstBtn === true}
						className="text-[#581A57] p-[8px] bg-[#E6DDE6]"
					/>
				</div>
			</Modal>
		</Card>
	);
};

export default Container;
