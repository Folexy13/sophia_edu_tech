import React, { useEffect, useState } from "react";
import {
	Menu,
	Input,
	Badge,
	Typography,
	MenuProps,
	Dropdown,
	Button,
	Space,
} from "antd";
import "./navbar.scss";
import { DownOutlined } from "@ant-design/icons";
import { BellOutlined, MessageOutlined, PlusOutlined } from "@ant-design/icons";
import { avatar, Logo } from "../../assets";
import { useNavigate } from "react-router-dom";
import { URL } from "../../utils/constants";

const { Title } = Typography;

const Navbar: React.FC<any> = () => {
	const navigate = useNavigate();
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
				{ key: "/learnings/courses", label: "Courses" },
				{ key: "/learnings/tutorials", label: "Tutorials" },
			],
		},
	];

	const dropdown: MenuProps["items"] = [
		{
			key: "1",
			label: <div onClick={() => navigate(URL.BIO)}>Profile</div>,
		},
		{
			key: "2",
			label: (
				<div onClick={() => navigate(URL.NOTIFICATION)}>Notifications</div>
			),
		},
		{
			key: "3",
			label: <div onClick={() => navigate(URL.MESSAGING)}>Messages</div>,
		},
		{
			key: "4",
			label: <div onClick={() => navigate(URL.WALLET)}>Wallet</div>,
		},
		{
			key: "5",
			label: (
				<div onClick={() => navigate(URL.GENERATE_CERTIFICATE)}>
					Generate Certificates
				</div>
			),
			disabled: true,
		},
	];

	const onClick: MenuProps["onClick"] = (e) => {
		console.log(e.key);
		if (e.key === "home") {
			navigate("/");
		} else if (e.key === "/learnings/courses") {
			navigate(URL.LEARNING);
		} else if (e.key === "/learnings/tutorials") {
			navigate(URL.COURSELISTING);
		}
	};

	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div className={`navbar w-[95%] mx-auto ${isScrolled ? "fixed" : ""}`}>
			<Title
				level={3}
				className="logo cursor-pointer"
				onClick={() => navigate("/")}
			>
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
					<div
						className="cursor-pointer"
						onClick={() => navigate(URL.NOTIFICATION)}
					>
						<Badge dot={true} className="cursor">
							<BellOutlined style={{ fontSize: "20px", marginLeft: "20px" }} />
						</Badge>
					</div>
					<div
						className="cursor-pointer"
						onClick={() => navigate(URL.NOTIFICATION)}
					>
						<Badge dot className="cursor">
							<MessageOutlined
								style={{ fontSize: "20px", marginLeft: "20px" }}
							/>
						</Badge>
					</div>
				</div>
				<div
					className="flex upload cursor-pointer"
					onClick={() => navigate(URL.UPLOAD)}
				>
					<PlusOutlined style={{ fontSize: "20px", marginLeft: "20px" }} />
					<p className="text-[#581A57] text-sm font-[inter]">Upload</p>
				</div>
			</div>
			<Dropdown menu={{ items: dropdown }}>
				<Button>
					<Space>
						<img src={avatar} alt=".." width={30} />
						<span>Aluko Opeyemi</span>
						<DownOutlined />
					</Space>
				</Button>
			</Dropdown>
		</div>
	);
};

export default Navbar;
