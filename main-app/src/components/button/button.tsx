import React from "react";
import { Button as AntdButton } from "antd";
interface IButtonProps {
	width?: string | number;
	height?: string | number;
	borderRadius?: string;
	children?: React.ReactNode;
	block?: boolean;
	className?: string;
	color?: string;
	label: string;
}
const Button: React.FC<IButtonProps> = ({ block, className, label }) => {
	return (
		<AntdButton className={className} block={block}>
			{label}
		</AntdButton>
	);
};

export default Button;
