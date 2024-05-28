import React from "react";
import { Menu, Layout as AntdLayout } from "antd";
import {
	HomeOutlined,
	BookOutlined,
	UploadOutlined,
	MessageOutlined,
	CaretDownFilled,
	PlusOutlined,
	DownOutlined,
} from "@ant-design/icons";
import { Navbar } from "../components";
const { Footer } = AntdLayout;
const Layout: React.FC<any> = ({ children }) => {
	return (
		<div className="relative ">
			<div className="p-[10px] md:p-[40px]">
				<Navbar />
			</div>
			<div>{children}</div>
			<Footer
				className="flex justify-between md:hidden w-full "
				style={{ position: "fixed", bottom: 0, width: "100%" }}
			>
				<Menu
					mode="horizontal"
					style={{ lineHeight: "inherit" }}
					className="w-full p-3"
				>
					<Menu.Item key="home" className="custom-menu-item">
						<div className="flex flex-col items-center">
							<HomeOutlined />
							<span>Home</span>
						</div>
					</Menu.Item>
					<Menu.Item key="learning" className="custom-menu-item">
						<div className="flex flex-col items-center">
							<DownOutlined />
							<span>Learning</span>
						</div>
					</Menu.Item>
					<Menu.Item key="upload" className="custom-menu-item">
						<div className="flex flex-col items-center">
							<PlusOutlined />
							<span>Upload</span>
						</div>
					</Menu.Item>
					<Menu.Item key="messages" className="custom-menu-item">
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
