import React, { useEffect } from "react";
import { Menu, Layout as AntdLayout, Dropdown } from "antd";
import {
	HomeOutlined,
	MessageOutlined,
	PlusOutlined,
	DownOutlined,
} from "@ant-design/icons";
import { Modal, Navbar } from "../components";
import { ClientRequest } from "../requests";
import { useModal, useUser } from "../store";
import { useNavigate } from "react-router-dom";
import { URL } from "../utils/constants";
const { Footer } = AntdLayout;
const Layout: React.FC<any> = ({ children }) => {
	const { setUser, user } = useUser();
	const {
		visible,
		modalTitle,
		modalContent,
		confirmLoading,
		onCancel,
		toggleModal,
	} = useModal();

	const handleCancel = () => {
		onCancel();
		toggleModal();
	};

	useEffect(() => {
		const fetchUser = async () => {
			const res: any = await ClientRequest.getMe();
			if (res) {
				setUser(res); // Set user data in Zustand store
			}
		};
		fetchUser();
	}, [setUser]);
	const navigate = useNavigate();
	const learningMenu: any = (
		<Menu>
			<Menu.Item key="development" onClick={() => navigate(URL.COURSELISTING)}>
				Learning Development courses
			</Menu.Item>
			<Menu.Item
				key="social"
				title="Social Entrepreneurship and Innovation courses"
				onClick={() => navigate(URL.COURSELISTING, { state: "social" })}
			>
				Social Entrepreneurship and ...
			</Menu.Item>
		</Menu>
	);
	return (
		<div className="relative ">
			<div className="p-[30px] px-[10px] sm:px-[20px] md-920:p-[40px]">
				<Navbar data={user} />
			</div>
			<div className="sm:mb-0 mb-[58px]">
				{children}
				<Modal
					isOpen={visible}
					onClose={handleCancel}
					title={modalTitle}
					confirmLoading={confirmLoading}
				>
					{modalContent}
				</Modal>
			</div>
			<Footer
				className="flex justify-between md:hidden w-full p-0 "
				style={{ position: "fixed", bottom: 0, width: "100%" }}
			>
				<Menu
					mode="horizontal"
					style={{ lineHeight: "inherit" }}
					className="w-full p-3 flex justify-center"
				>
					<Menu.Item
						key="home"
						className="custom-menu-item"
						onClick={() => navigate("/")}
					>
						<div className="flex flex-col items-center">
							<HomeOutlined />
							<span>Home</span>
						</div>
					</Menu.Item>
					<Dropdown
						overlay={learningMenu}
						trigger={["click"]}
						placement="bottomRight"
					>
						<Menu.Item key="learning" className="custom-menu-item">
							<div className="flex flex-col items-center">
								<DownOutlined />
								<span>Learning</span>
							</div>
						</Menu.Item>
					</Dropdown>
					<Menu.Item
						key="upload"
						className="custom-menu-item"
						onClick={() => navigate(URL.UPLOAD)}
					>
						<div className="flex flex-col items-center">
							<PlusOutlined />
							<span>Upload</span>
						</div>
					</Menu.Item>
					<Menu.Item
						key="messages"
						className="custom-menu-item"
						onClick={() => navigate(URL.MESSAGING)}
					>
						<div className="flex flex-col items-center">
							<MessageOutlined />
							<span>Messages</span>
						</div>
					</Menu.Item>
				</Menu>
			</Footer>
		</div>
	);
};

export default Layout;
