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
	onclick?: any;
	label: string;
	loading?: boolean;
}
const Button: React.FC<IButtonProps> = ({
	block,
	className,
	onclick,
	loading,
	label,
}) => {
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
};

export default Button;
