import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import "./courses.scss";
import { Collapse, CollapseProps, Tabs } from "antd";

import { Button, TabPanel } from "../../../components";
import { ChatBox } from "../../../components/chatbot.tsx";
import studentRequest from "../../../requests/students.request";

import { Bot, CircleCheck, DiscIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import { truncate } from "lodash";

const Learn: React.FC<any> = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeKey, setActiveKey] = useState<string>("1");
  const [_, setLoading] = useState(true);
  const [course, setCourse] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [currentModuleNo, setCurrentModuleNo] = useState<number>(0);
  const onChange = (key: string) => {
    console.log(key);
    setActiveKey(key);
  };
  const { id: courseId } = useParams<{ id: string }>();

  // Fetch course data when component mounts
  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;
      try {
        setLoading(true);
        const response: any = await studentRequest.getCourseById(courseId);
        
        setCourse(response);
      } catch (err: any) {
        setError(err.message || "Failed to fetch course data");
        console.error("Error fetching course:", err);
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);
  const expandIcon = (panelProps: any) =>
    panelProps.isActive ? <CircleCheck  color="#fff" /> : <DiscIcon color="#fff" />;

  const renderCollapseItems = (): CollapseProps["items"] => {
    const modules = course?.modules || [];
    return modules.map((module: any, index: any) => ({
      key: `${module.description}-${index + 1}`,
      label:<p onClick={()=>setCurrentModuleNo(index)}>{module.name || module.title}</p>,
      children: <p>{truncate(module.description, { length: 100 })}</p>,
    }));
  };


  const handleCollapseChange = (key: string | string[]) => {
    console.log(key);
  };

  const CustomTabBar = () => (
    <div className="flex  gap-3 justify-center sm:justify-end sm:w-2/5 ml-auto mb-6">
      {course?.modules[currentModuleNo]?.data?.map((item: any, index: number) => (
        <Button
          key={index}
          className="px-6 py-3 flex-1 sm:flex-none sm:min-w-[120px] text-sm font-medium"
          iconColor={activeKey == `${index + 1}` ? "#581A57" : "#B6B6B6"}
          type="tab"
          label={item.title}
          onclick={() => onChange(`${index + 1}`)}
          active={activeKey == `${index + 1}`}
        />
      ))}
    </div>
  );
  return (
    <Layout>
      <div className="px-[10px] sm:px-[30px] mx-auto learn_course full-page">
        <div className="relative flex gap-4  sm:flex-row flex-col justify-between">
          <div className="w-[30%]">
            <div>
              <h2 className="sm:top-[12px] mb-[10px] sm:mb-20 font-semibold header">
                Course Module (History)
              </h2>
              {(renderCollapseItems() || []).map((item, index) => (
                <Collapse
                  key={`${item.key}-${index}`}
                  onChange={handleCollapseChange}
                  items={[item]}
                  accordion
                  className="custom-collapse w-full"
                  expandIcon={expandIcon}
                />
              ))}
            </div>
          </div>

          <div className="w-[70%]">
            <Tabs
            className="relative "
            activeKey={activeKey}
            items={TabPanel}
            renderTabBar={CustomTabBar}
          />
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <div className="fixed bottom-24 right-4">
        <button
          onClick={() => setIsChatOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <Bot className="w-6 h-6" />
        </button>
      </div>
      <ChatBox isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </Layout>
  );
};

export default Learn;
