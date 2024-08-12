import React from "react";
import { Button as AntdButton } from "antd";
import { DiscIcon } from "../../assets";

interface IButtonProps {
	width?: string | number;
	height?: string | number;
	borderRadius?: string;
	children?: React.ReactNode;
	block?: boolean;
	className?: string;
	color?: string;
	onclick?: () => void;
	onhover?: () => void;
	label: string;
	loading?: boolean;
	disabled?: boolean;
	htmlType?: "submit" | "reset" | "button"; // Added type propp
	type?: string; // Added type propp
	iconColor?: string; // Added type prop
	active?: boolean;
	icon?: any; // Added type prop
}

const Button: React.FC<IButtonProps> = ({
	block,
	className,
	onclick,
	loading,
	onhover,
	label,
	active,
	icon,
	iconColor,
	type, // Default type is empty string
	htmlType,
	disabled,
}) => {
	if (type === "tab") {
		return (
			<AntdButton
				loading={loading}
				disabled={disabled}
				className={[
					"border-[0] border-t-[2px] rounded-0 flex flex-col items-center justify-center",
					active
						? "text-[#581A57] border-[#581A57]"
						: "text-[#B6B6B6] border-[#B6B6B6]",
					className,
				].join(" ")}
				block={block}
				htmlType={htmlType}
				onClick={onclick}
				onMouseEnter={onhover}
			>
				{icon ? icon : <DiscIcon color={iconColor} />}
				<span>{label}</span>
			</AntdButton>
		);
	} else {
		return (
			<AntdButton
				disabled={disabled}
				htmlType={htmlType}
				loading={loading}
				className={className}
				block={block}
				onClick={onclick}
			>
				{label}
			</AntdButton>
		);
	}
};

export default Button;
