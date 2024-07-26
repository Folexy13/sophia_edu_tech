import React, { useEffect } from "react";
import { Menu, Layout as AntdLayout } from "antd";
import {
	HomeOutlined,
	MessageOutlined,
	PlusOutlined,
	DownOutlined,
} from "@ant-design/icons";
import { Navbar } from "../components";
import { ClientRequest } from "../requests";
import { useUser } from "../store";
const { Footer } = AntdLayout;
const Layout: React.FC<any> = ({ children }) => {
	const { setUser, user } = useUser();

	useEffect(() => {
		const fetchUser = async () => {
			const res: any = await ClientRequest.getMe();
			if (res) {
				setUser(res); // Set user data in Zustand store
			}
		};
		fetchUser();
	}, [setUser]);
	return (
		<div className="relative ">
			<div className="p-[30px] px-[20px] md-920:p-[40px]">
				<Navbar data={user} />
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
