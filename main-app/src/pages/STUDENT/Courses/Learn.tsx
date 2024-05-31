import React, { useState } from "react";
import Layout from "../../Layout";
import "./courses.scss";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { Button } from "../../../components";

const Learn: React.FC<any> = () => {
	const [activeKey, setActiveKey] = useState<string>("1");
	const onChange = (key: string) => {
		console.log(key);
		setActiveKey(key);
	};
	const renderTabLabel = (label: string) => (
		<div className="custom-tab-label">
			<span>{label}</span>
		</div>
	);
	const items: TabsProps["items"] = [
		{
			key: "1",
			label: renderTabLabel("Tab 1"),
			children: (
				<div className="tab-content">
					<h1>Content of Tab Pane 1</h1>
					<p>This is some content for Tab 1</p>
				</div>
			),
		},
		{
			key: "2",
			label: renderTabLabel("Tab 2"),
			children: (
				<div className="tab-content">
					<h1>Content of Tab Pane 2</h1>
					<p>This is some content for Tab 2</p>
				</div>
			),
		},
		{
			key: "3",
			label: renderTabLabel("Tab 3"),
			children: (
				<div className="tab-content">
					<h1>Content of Tab Pane 3</h1>
					<p>This is some content for Tab 3</p>
				</div>
			),
		},
		{
			key: "4",
			label: renderTabLabel("Tab 4"),
			children: (
				<div className="tab-content">
					<h1>Content of Tab Pane 4</h1>
					<p>This is some content for Tab 3</p>
				</div>
			),
		},
	];
	const CustomTabBar = () => (
		<div className="flex gap-2 justify-end">
			<Button
				className="p-4 "
				label="Introduction"
				onclick={() => onChange("1")}
				type="tab"
				active
			/>
			<Button type="tab" label="Academia" onclick={() => onChange("2")} />
			<Button type="tab" label="Education" onclick={() => onChange("3")} />
			<Button type="tab" label="Video" onclick={() => onChange("3")} />
		</div>
	);
	return (
		<Layout>
			<div className="px-[30px] mx-auto learn_course full-page">
				<div className="relative flex justify-between">
					<h2 className="absolute top-[12px] font-semibold header">
						Course Module (History)
					</h2>
					<Tabs
						className="relative"
						activeKey={activeKey}
						items={items}
						renderTabBar={CustomTabBar}
					/>
				</div>
			</div>
		</Layout>
	);
};

export default Learn;
