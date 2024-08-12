import React, { useState } from "react";
import { Avatar, Card, Form, Input, Progress } from "antd";
import { Button, Modal } from "..";

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
	onClick?: any;
	buttonColor: string;
}

const Container: React.FC<ICardProps> = ({
	name,
	image,
	price,
	avatar,
	onClick,
	subject,
	description,
	buttonText,
	buttonColor,
	isSubscribed,
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
			onClick={onClick}
			cover={
				<div className="relative">
					{/* Background Image with Transparency */}
					<img
						alt="example"
						src={image}
						className="h-[150px] w-full object-cover rounded-md"
					/>
					{/* Black Overlay */}
					<div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
					{/* Centered Course Subject */}
					<div className="absolute inset-0 flex items-center justify-center">
						<span className="text-white font-bold text-lg font-inte">
							{subject}
						</span>
					</div>
					{/* Avatar */}
					<Avatar
						size={64}
						src={avatar}
						className="mb-3 absolute border-4 border-solid border-white left-1/2 transform -translate-x-1/2 -translate-y-1/2"
					/>
				</div>
			}
		>
			{/* Content */}
			<Meta
				title={name}
				description="Instructor"
				className="text-center !mt-[10px] font-inter font-medium"
			/>
			{/* Description */}
			<p className="text-center">{description}</p>
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
						label={buttonText}
						className={`bg-[${buttonColor}] text-white p-3 w-[100px] font-inter`}
					/>
				</>
			) : (
				<div className="mt-[22px] flex justify-between">
					<p className="text-[#121212] text-[18px]">
						Price <span className="text-black font-inter">{price}</span>
					</p>
					<Button
						className="bg-[#581A57] text-white p-3 w-[100px]"
						label="Subscribe"
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
				<Form layout="vertical">
					<Form.Item label="Course Title">
						<Input name="course" placeholder="Enter your Course of Choice" />
					</Form.Item>
					<Form.Item label="Amount">
						<Input name="amount" placeholder="$15" />
					</Form.Item>
				</Form>
				<div style={{ marginTop: "20px", textAlign: "right" }}>
					<Button
						loading={buttonLoading.secondBtn === true}
						onclick={handlePayWithWallet}
						label="Pay with wallet"
						className="mr-[10px] p-[8px] bg-[#581A57] text-white"
					/>
					<Button
						onclick={handleTopUpWallet}
						loading={buttonLoading.firstBtn === true}
						label="Top up wallet"
						className="text-[#581A57] p-[8px] bg-[#E6DDE6]"
					/>
				</div>
			</Modal>
		</Card>
	);
};

export default Container;
