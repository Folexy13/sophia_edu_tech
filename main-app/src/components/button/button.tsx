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
	onClick?: () => void;
	label: string;
	loading?: boolean;
	type?: string; // Added type prop
	active?: boolean;
	icon?: any; // Added type prop
}

const Button: React.FC<IButtonProps> = ({
	block,
	className,
	onclick,
	loading,
	label,
	active,
	icon,
	type, // Default type is empty string
}) => {
	if (type === "tab") {
		return (
			<AntdButton
				loading={loading}
				className={[
					"border-[0] border-t-[2px] rounded-0 flex flex-col items-center justify-center",
					active
						? "text-[#581A57] border-[#581A57]"
						: "text-[#B6B6B6] border-[#B6B6B6]",
					className,
				].join(" ")}
				block={block}
				onClick={onclick}
			>
				{icon ? icon : <DiscIcon />}
				<span>{label}</span>
			</AntdButton>
		);
	} else {
		return (
			<AntdButton
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
