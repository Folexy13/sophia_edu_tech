import React, { ReactNode, useEffect, useState } from "react";
import { Button, Dropdown, Layout, Menu, MenuProps, Space } from "antd";
import { DownOutlined, SettingOutlined } from "@ant-design/icons";
import {
	avatar,
	CourseIcon,
	Logo,
	NotificationBell,
	OverviewIcon,
	StudentsIcon,
	Wallet2Icon,
} from "../assets";
import { useLocation, useNavigate } from "react-router-dom";
import { URL } from "../utils/constants";

const { Header, Sider, Content } = Layout;

const DashboardLayout: React.FC<{ children: ReactNode; title: string }> = ({
	children,
	title,
}) => {
	const [activeKey, setActiveKey] = useState<string>("1");
	const navigate = useNavigate();
	const { pathname } = useLocation();
	useEffect(() => {
		if (pathname === URL.OVERVIEW) {
			setActiveKey("1");
		} else if (pathname === URL.COURSES || pathname === URL.CREATE_COURSE) {
			setActiveKey("2");
		}
		return () => {};
	}, [pathname]);

	const handleMenuClick = (e: any) => {
		setActiveKey(e.key);
		if (e.key === "1") {
			navigate(URL.OVERVIEW);
		} else if (e.key === "2") {
			navigate(URL.COURSES);
		}
	};
	const dropdown: MenuProps["items"] = [
		{
			key: "1",
			label: (
				<div className="text-[16px]" onClick={() => navigate(URL.BIO)}>
					View Profile
				</div>
			),
		},
		{
			key: "2",
			label: <div className="text-red-600 text-[16px]">Logout</div>,
		},
	];
	const getMenuItemClass = (key: string) =>
		activeKey === key
			? "!text-[#581A57] !bg-[#F5F5F5] !border-r-3 !border-[#F5F5F5] !font-bold !text-[16px] !my-[20px]"
			: "!text-[#808080] !text-[16px] !inter-normal !my-[20px]";
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sider theme="light" className="!min-w-[300px]">
				<div className="justify-center p-4 flex ">
					<img
						src={Logo}
						alt="logo"
						width={100}
						style={{ maxWidth: "100%", maxHeight: "100%" }}
					/>
				</div>
				<Menu
					theme="light"
					mode="inline"
					selectedKeys={[activeKey]}
					onClick={handleMenuClick}
					className="rounded-0"
				>
					<Menu.Item
						key="1"
						icon={
							<OverviewIcon color={activeKey == "1" ? "#581A57" : "#808080"} />
						}
						className={getMenuItemClass("1")}
					>
						Overviews
					</Menu.Item>
					<Menu.Item
						key="2"
						icon={
							<CourseIcon color={activeKey == "2" ? "#581A57" : "#808080"} />
						}
						className={getMenuItemClass("2")}
					>
						Courses
					</Menu.Item>
					<Menu.Item
						key="3"
						icon={
							<StudentsIcon color={activeKey == "3" ? "#581A57" : "#808080"} />
						}
						className={getMenuItemClass("3")}
					>
						Students
					</Menu.Item>
					<Menu.Item
						key="4"
						icon={
							<Wallet2Icon color={activeKey == "4" ? "#581A57" : "#808080"} />
						}
						className={getMenuItemClass("4")}
					>
						Wallet
					</Menu.Item>
					<Menu.Item
						key="5"
						icon={
							<SettingOutlined
								color={activeKey == "5" ? "#581A57" : "#808080"}
							/>
						}
						className={getMenuItemClass("5")}
					>
						Settings
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout className="site-layout">
				<Header
					className="!px-[20px] bg-white flex justify-between items-center"
					style={{ padding: 0 }}
				>
					<h2 className=" font-semibold inter-bold text-[24px]">{title}</h2>
					<div className="flex gap-3 items-center">
						<NotificationBell className="cursor-pointer" />
						<Dropdown
							className="border-0 bg-transparent mt-[7px] !shadow-none "
							menu={{ items: dropdown }}
						>
							<Button>
								<Space>
									<img src={avatar} alt=".." width={30} />
									<DownOutlined />
								</Space>
							</Button>
						</Dropdown>
					</div>
				</Header>
				<Content style={{ margin: "0 16px" }}>
					<div
						className="site-layout-background"
						style={{ padding: 24, minHeight: 360 }}
					>
						{children}
					</div>
				</Content>
			</Layout>
		</Layout>
	);
};

export default DashboardLayout;
