import React from "react";
import { Modal as AntModal } from "antd";

const CustomModal: React.FC<any> = ({
	isOpen,
	onClose,
	className,
	title,
	children,
	confirmLoading,
}) => {
	return (
		<AntModal
			title={title}
			open={isOpen}
			confirmLoading={confirmLoading}
			centered
			className={className}
			footer={null} // Removed default footer
			onCancel={onClose}
		>
			{children}
		</AntModal>
	);
};

export default CustomModal;
