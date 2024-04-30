import { Button as AntdButton } from "antd"; // Rename imported Button to avoid naming conflict
import { ReactNode } from "react";

interface IButtonProps {
	width: string | number;
	height: string | number;
	borderRadius: string;
	children?: ReactNode;
}

const CustomButton: React.FC<IButtonProps> = ({
	width,
	height,
	borderRadius,
	children,
}) => {
	return (
		<AntdButton
			style={{ width, height, borderRadius }} // Apply styles to the AntdButton
		>
			{children}
		</AntdButton>
	);
};

export default CustomButton; // Export the component
