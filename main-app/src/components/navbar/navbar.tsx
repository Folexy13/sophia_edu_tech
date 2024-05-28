import React from "react";
import {
	Menu,
	Input,
	Badge,
	Typography,
	MenuProps,
	Dropdown,
	Button,
	message,
	Space,
} from "antd";
import "./navbar.scss";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { BellOutlined, MessageOutlined, PlusOutlined } from "@ant-design/icons";
import { Logo } from "../../assets";

const { Title } = Typography;

const Navbar: React.FC<any> = () => {
	type MenuItem = Required<MenuProps>["items"][number];
	const items: MenuItem[] = [
		{
			key: "home",
			label: "Home",
		},
		{
			key: "learnings",
			label: "Learnings",
			children: [
				{ key: "1", label: "Courses" },
				{ key: "2", label: "Tutorials" },
			],
		},
	];

	const dropdown: MenuProps["items"] = [
		{
			label: "1st menu item",
			key: "1",
		},
		{
			label: "2nd menu item",
			key: "2",
		},
		{
			label: "3rd menu item",
			key: "3",
			danger: true,
		},
		{
			label: "4rd menu item",
			key: "4",
			danger: true,
			disabled: true,
		},
	];

	const onClick: MenuProps["onClick"] = (e) => {
		console.log("click ", e);
	};

	const handleMenuClick: MenuProps["onClick"] = (e) => {
		message.info("Click on menu item.");
		console.log("click", e);
	};
	const menuProps = {
		dropdown,
		onClick: handleMenuClick,
	};
	return (
		<div className="navbar">
			<Title level={3} className="logo">
				<img src={Logo} alt="..." style={{ width: 108 }} />
			</Title>
			<Input
				placeholder="Search"
				// enterButton="Search"
				size="large"
				allowClear
				className="w-[200px] sm:w-[250px] rounded-3xl p-2 ml-[12px] md:ml-0 md:p-3"
			/>
			<div className="none">
				<Menu
					onClick={onClick}
					style={{ width: 256 }}
					mode="horizontal"
					items={items}
				/>
			</div>
			<div className="flex gap-6">
				<div className="flex">
					<Badge dot={true} className="cursor">
						<BellOutlined style={{ fontSize: "20px", marginLeft: "20px" }} />
					</Badge>
					<Badge dot className="cursor">
						<MessageOutlined style={{ fontSize: "20px", marginLeft: "20px" }} />
					</Badge>
				</div>
				<div className="flex upload">
					<PlusOutlined style={{ fontSize: "20px", marginLeft: "20px" }} />
					<p className="text-[#581A57] text-sm font-[inter]">Upload</p>
				</div>
			</div>
			<Dropdown menu={menuProps} disabled placement="bottomRight">
				<>
					<a className="ant-dropdown-link" style={{ marginLeft: "20px" }}>
						<Button prefix={Logo}>
							<Space>
								Aluko Opeyemi
								<DownOutlined />
							</Space>
						</Button>
					</a>
					<a className="ant-dropdown-link2" style={{ marginLeft: "20px" }}>
						<Space>
							<UserOutlined />

							<DownOutlined />
						</Space>
					</a>
				</>
			</Dropdown>
		</div>
	);
};

export default Navbar;
