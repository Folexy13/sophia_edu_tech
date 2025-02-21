import React, {useState} from "react";
import Layout from "../../Layout";
import "./courses.scss";
import {Collapse, Progress, Tabs} from "antd";
import type {CollapseProps, TabsProps} from "antd";
import {Button} from "../../../components";
import {ArrowLeftOutlined, ArrowRightOutlined} from "@ant-design/icons";
import {DiscIcon} from "../../../assets";
import {ChatBox} from "../../../components/chatbot.tsx";

import { Bot } from 'lucide-react';

const Learn: React.FC<any> = () => {

    const [isChatOpen, setIsChatOpen] = useState(false);
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

    const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

    const collapseItem: CollapseProps["items"] = [
        {
            key: "1",
            label: "Module 1",
            children: <p>{text}</p>,
        },
    ];
    const handleCollpaseChange = (key: string | string[]) => {
        console.log(key);
    };
    const expandIcon = (panelProps: any) =>
        panelProps.isActive ? <DiscIcon color="#fff"/> : <DiscIcon color="#fff"/>;

    const items: TabsProps["items"] = [
        {
            key: "1",
            label: renderTabLabel("Tab 1"),
            children: (
                <div className="flex sm:flex-row flex-col-reverse mt-[10px] sm:mt-[50px] gap-6 w-full">
                    <div className="sm:block hidden w-[25%]">
                        <Collapse
                            onChange={handleCollpaseChange}
                            items={collapseItem}
                            accordion
                            className="custom-collapse w-full"
                            expandIcon={expandIcon} // Add custom icon
                        />
                        <Collapse
                            onChange={handleCollpaseChange}
                            items={collapseItem}
                            accordion
                            className="custom-collapse w-full"
                            expandIcon={expandIcon} // Add custom icon
                        />
                        <Collapse
                            onChange={handleCollpaseChange}
                            items={collapseItem}
                            accordion
                            className="custom-collapse w-full"
                            expandIcon={expandIcon} // Add custom icon
                        />
                        <Collapse
                            onChange={handleCollpaseChange}
                            items={collapseItem}
                            accordion
                            className="custom-collapse w-full"
                            expandIcon={expandIcon} // Add custom icon
                        />
                    </div>
                    <div className="sm:w-[75%] relative main">
                        {/* video container */}
                        <div className="bg-[#D9D9D9] rounded-lg h-[300px] w-full "></div>
                        <Progress
                            showInfo={false}
                            strokeWidth={5}
                            strokeColor="#808080"
                            className="sm:py-[1px] my-0 sm:my-[10px]"
                            percent={80}
                        />

                        {/* text */}
                        <div className="sm:block hidden pb-[60px]  h-[350px] overflow-hidden overflow-y-scroll">
                            <p className="text-[14px] my-[10px]">
                                This course lorem ipsum dolor sit amet consectetur. Eu mi
                                pulvinar risus dapibus eget. Malesuada auctor a elementum mollis
                                justo enim nisi nullam nisl. Fringilla proin aenean non
                                tincidunt imperdiet. Tellus egestas purus sit fermentum.
                            </p>

                            <p className="text-[14px] my-[10px]">
                                This course lorem ipsum dolor sit amet consectetur. Eu mi
                                pulvinar risus dapibus eget. Malesuada auctor a elementum mollis
                                justo enim nisi nullam nisl. Fringilla proin aenean non
                                tincidunt imperdiet. Tellus egestas purus sit fermentum.
                            </p>
                            <p className="text-[14px] my-[10px]">
                                This course lorem ipsum dolor sit amet consectetur. Eu mi
                                pulvinar risus dapibus eget. Malesuada auctor a elementum mollis
                                justo enim nisi nullam nisl. Fringilla proin aenean non
                                tincidunt imperdiet. Tellus egestas purus sit fermentum.
                            </p>
                            <p className="text-[14px] my-[10px]">
                                This course lorem ipsum dolor sit amet consectetur. Eu mi
                                pulvinar risus dapibus eget. Malesuada auctor a elementum mollis
                                justo enim nisi nullam nisl. Fringilla proin aenean non
                                tincidunt imperdiet. Tellus egestas purus sit fermentum.
                            </p>
                            <p className="text-[14px] my-[10px]">
                                This course lorem ipsum dolor sit amet consectetur. Eu mi
                                pulvinar risus dapibus eget. Malesuada auctor a elementum mollis
                                justo enim nisi nullam nisl. Fringilla proin aenean non
                                tincidunt imperdiet. Tellus egestas purus sit fermentum.
                            </p>
                            <p className="text-[14px] my-[10px]">
                                This course lorem ipsum dolor sit amet consectetur. Eu mi
                                pulvinar risus dapibus eget. Malesuada auctor a elementum mollis
                                justo enim nisi nullam nisl. Fringilla proin aenean non
                                tincidunt imperdiet. Tellus egestas purus sit fermentum.
                            </p>
                            <p className="text-[14px] my-[10px]">
                                This course lorem ipsum dolor sit amet consectetur. Eu mi
                                pulvinar risus dapibus eget. Malesuada auctor a elementum mollis
                                justo enim nisi nullam nisl. Fringilla proin aenean non
                                tincidunt imperdiet. Tellus egestas purus sit fermentum.
                            </p>
                            <p className="text-[14px] my-[10px]">
                                This course lorem ipsum dolor sit amet consectetur. Eu mi
                                pulvinar risus dapibus eget. Malesuada auctor a elementum mollis
                                justo enim nisi nullam nisl. Fringilla proin aenean non
                                tincidunt imperdiet. Tellus egestas purus sit fermentum.
                            </p>
                            <p className="text-[14px] my-[10px]">
                                This course lorem ipsum dolor sit amet consectetur. Eu mi
                                pulvinar risus dapibus eget. Malesuada auctor a elementum mollis
                                justo enim nisi nullam nisl. Fringilla proin aenean non
                                tincidunt imperdiet. Tellus egestas purus sit fermentum.
                            </p>
                        </div>
                        {/* Indicators */}
                        <div className="hidden sm:block absolute bottom-2  left-0 cursor-pointer">
							<span className="bg-[#581A57] mr-2  p-2 rounded">
								<ArrowLeftOutlined/>
							</span>
                            <span className="text-[#666666] text-[14px]">Introduction</span>
                        </div>
                        <div className="hidden sm:block absolute bottom-2 right-0 cursor-pointer">
                            <span className="text-[#666666] text-[14px]">Education</span>

                            <span className="bg-[#581A57]  ml-2  p-2 rounded">
								<ArrowRightOutlined/>
							</span>
                        </div>
                    </div>
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
        <div className="flex gap-2 justify-end  sm:w-2/5 ml-auto">
            <Button
                className="p-4 flex-1 sm:w-full w-[20%]"
                label="Introduction"
                onclick={() => onChange("1")}
                // onhover={() => onChange("1")}
                type="tab"
                iconColor={activeKey == "1" ? "#581A57" : "#B6B6B6"}
                active={activeKey == "1"}
            />
            <Button
                className="p-4 flex-1 sm:w-full w-[20%]"
                iconColor={activeKey == "2" ? "#581A57" : "#B6B6B6"}
                type="tab"
                label="Academia"
                // onhover={() => setActiveKey("2")}
                onclick={() => onChange("2")}
                active={activeKey == "2"}
            />
            <Button
                className="p-4 flex-1 sm:w-full w-[20%]"
                iconColor={activeKey == "3" ? "#581A57" : "#B6B6B6"}
                type="tab"
                // onhover={() => setActiveKey("3")}
                label="Education"
                onclick={() => onChange("3")}
                active={activeKey == "3"}
            />
            <Button
                className="p-4 flex-1 sm:w-full w-[20%]"
                iconColor={activeKey == "4" ? "#581A57" : "#B6B6B6"}
                type="tab"
                label="Video"
                // onhover={() => setActiveKey("4")}
                onclick={() => onChange("4")}
                active={activeKey == "4"}
            />
        </div>
    );
    return (
        <Layout>
            <div className="px-[10px] sm:px-[30px] mx-auto learn_course full-page">
                <div className="relative flex sm:flex-row flex-col justify-between">
                    <h2 className="sm:absolute sm:top-[12px] mb-[10px] sm:mb-0 font-semibold header">
                        Course Module (History)
                    </h2>
                    <Tabs
                        className="relative "
                        activeKey={activeKey}
                        items={items}
                        renderTabBar={CustomTabBar}
                    />
                </div>
            </div>
            <div className="fixed bottom-8 right-4">
                <button
                    onClick={() => setIsChatOpen(true)}
                    className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                >
                    <Bot className="w-6 h-6" />
                </button>
            </div>
            <ChatBox isOpen={isChatOpen} onClose={() => setIsChatOpen(false)}/>
        </Layout>
    );
};

export default Learn;
