import React, {useState} from "react";
import Layout from "../../Layout";
import "./courses.scss";
import  {Tabs} from "antd";

import {Button, TabPanel} from "../../../components";
import {ChatBox} from "../../../components/chatbot.tsx";

import {Bot} from 'lucide-react';

const Learn: React.FC<any> = () => {

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [activeKey, setActiveKey] = useState<string>("1");
    const onChange = (key: string) => {
        console.log(key);
        setActiveKey(key);
    };

    const CustomTabBar = () => (
        <div className="flex  gap-3 justify-center sm:justify-end sm:w-2/5 ml-auto mb-6">
            <Button
                className="px-6 py-3 flex-1 sm:flex-none sm:min-w-[120px] text-sm font-medium"
                label="Introduction"
                onclick={() => onChange("1")}
                type="tab"
                iconColor={activeKey == "1" ? "#581A57" : "#B6B6B6"}
                active={activeKey == "1"}
            />
            <Button
                className="px-6 py-3 flex-1 sm:flex-none sm:min-w-[120px] text-sm font-medium"
                iconColor={activeKey == "2" ? "#581A57" : "#B6B6B6"}
                type="tab"
                label="Academia"
                onclick={() => onChange("2")}
                active={activeKey == "2"}
            />
            <Button
                className="px-6 py-3 flex-1 sm:flex-none sm:min-w-[120px] text-sm font-medium"
                iconColor={activeKey == "3" ? "#581A57" : "#B6B6B6"}
                type="tab"
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
                        items={TabPanel}
                        renderTabBar={CustomTabBar}
                    />
                </div>
            </div>
            <div className="fixed bottom-24 right-4">
                <button
                    onClick={() => setIsChatOpen(true)}
                    className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                >
                    <Bot className="w-6 h-6"/>
                </button>
            </div>
            <ChatBox isOpen={isChatOpen} onClose={() => setIsChatOpen(false)}/>
        </Layout>
    );
};

export default Learn;
