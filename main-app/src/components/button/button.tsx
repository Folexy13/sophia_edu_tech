import React from "react";
import { Button as AntdButton } from "antd";
interface IButtonProps {
	width?: string | number;
	height?: string | number;
	borderRadius?: string;
	children?: React.ReactNode;
	block?: boolean;
}
const Button: React.FC<IButtonProps> = ({ block }) => {
	return <AntdButton block={block}>Button</AntdButton>;
};

export default Button;
