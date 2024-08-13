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
import { Logo } from "../../assets";
import { useNavigate } from "react-router-dom";
import { URL } from "../../utils/constants";
import { getAvatar } from "../../utils/helperFunction";
import { truncate } from "lodash";
import { useScreenSize } from "../../utils/hooks/useScreen";
import { useModal } from "../../store";
import { LogOutModal } from "..";

const { Title } = Typography;

const Navbar: React.FC<{ data: any }> = ({ data }) => {
	const navigate = useNavigate();
	const { showConfirmModal } = useModal();

	const showLogout = () => {
		showConfirmModal(
			"",
			<LogOutModal />,
			() => console.log("Confirmed"),
			() => console.log("Cancelled")
		);
	};

	type MenuItem = Required<MenuProps>["items"][number];
	const { isTablet } = useScreenSize();
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	const items: MenuItem[] = [
		{
			key: "home",
			label: "Home",
		},
		{
			key: "learnings",
			label: (
				<span>
					Learnings <DownOutlined />
				</span>
			),
			children: [
				{
					key: "/learnings/development",
					label: "Learning Development courses",
				},
				{
					key: "/learnings/social",
					label: "Social Entrepreneurship and Innovation courses",
				},
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
			// disabled: true,
		},

		...(isMobile
			? [
					{
						key: "6",
						label: (
							<div onClick={() => navigate(URL.GENERATE_CERTIFICATE)}>
								Recently read
							</div>
						),
						// disabled: true,
					},
			  ]
			: []),
		{
			key: "7",
			label: (
				<div className="text-[#f00]" onClick={showLogout}>
					Logout
				</div>
			),
		},
	];

	const onClick: MenuProps["onClick"] = (e) => {
		console.log(e.key);
		if (e.key === "home") {
			navigate("/");
		} else if (e.key === "/learnings/development") {
			navigate(URL.COURSELISTING);
		} else if (e.key === "/learnings/social") {
			navigate(URL.COURSELISTING, { state: "social" });
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
		<div
			className={`navbar w-[95%] mx-auto ${
				isScrolled || isMobile ? "fixed" : ""
			}`}
		>
			<Title
				level={3}
				className="logo cursor-pointer"
				onClick={() => navigate("/")}
			>
				<img src={Logo} alt="..." className="md-920:w-[108px] w-[60px]" />
			</Title>
			<Input
				placeholder="Search"
				// enterButton="Search"
				size="large"
				allowClear
				className={`${
					isTablet ? "w-[50%]" : "w-[250px]"
				}   rounded-3xl p-2 ml-[12px] md:ml-0 md:p-3`}
			/>
			{isTablet ? (
				<>
					<div className="flex !gap-[20px]">
						<div
							className="cursor-pointer"
							onClick={() => navigate(URL.NOTIFICATION)}
						>
							<Badge dot={true} className="cursor">
								<BellOutlined
									className="sm:text-[24px] text-[18px]"
									style={{ marginLeft: "20px" }}
								/>
							</Badge>
						</div>
						<Dropdown menu={{ items: dropdown }}>
							<Space>
								<img
									src={getAvatar(data?.profile_image)}
									alt=".."
									width={30}
									className="w-[30px] "
									style={{ borderRadius: "50%" }}
								/>

								<DownOutlined />
							</Space>
						</Dropdown>
					</div>
				</>
			) : (
				<>
					<Menu
						onClick={onClick}
						// overflowedIndicator={false}
						style={{ width: 256 }}
						mode="horizontal"
						items={items}
					/>
					<div className="flex gap-6">
						<div className="flex">
							<div
								className="cursor-pointer"
								onClick={() => navigate(URL.NOTIFICATION)}
							>
								<Badge dot={true} className="cursor">
									<BellOutlined
										style={{ fontSize: "20px", marginLeft: "20px" }}
									/>
								</Badge>
							</div>
							<div
								className="cursor-pointer"
								onClick={() => navigate(URL.MESSAGING)}
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
					<Dropdown menu={{ items: dropdown }} className="ml-[10px]">
						<Button className="hover:!border-[#581A57] border-[#581A57] bg-[#F5F5F5] hover:!bg-[#F5F5F5] py-[20px] hover:!text-[#581A57]">
							<Space>
								<img
									src={getAvatar(data?.profile_image)}
									alt=".."
									width={30}
									style={{ borderRadius: "50%" }}
								/>

								<span>{truncate(data?.full_name, { length: 20 })}</span>

								<DownOutlined />
							</Space>
						</Button>
					</Dropdown>
				</>
			)}
		</div>
	);
};

export default Navbar;
