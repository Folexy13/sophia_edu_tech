import React, {useState, useEffect} from "react";
import Layout from "../../DashboardLayout";
import {Button, Form, Input, Select, Upload} from "antd";
import {
    applied_science_data,
    formal_science_data,
    humanities_data,
    natural_science_data,
    social_science_data, URL,
} from "../../../utils/constants";
import {ArrowLeftOutlined, UploadOutlined} from "@ant-design/icons";
import {CourseProps, useCourse} from "../../../store.tsx";
import {toast} from "react-toastify";
import {TutorRequest} from "../../../requests";
import {useNavigate} from "react-router-dom";

const handleBeforeUpload = (file: File) => {
    console.log("📂 File selected:", file);
    return false; // ❌ Prevent default POST request
};
const CreateCoursePage: React.FC = () => {
    const [form] = Form.useForm();
    const [moduleNumber, setModuleNumber] = useState<number>(1);
    const [category, setCategory] = useState<string>("");
    const {course, setCourse} = useCourse()
    const [loading, setLoading] = useState<boolean>(true);
    const [type, setType] = useState<string>("");
    const [currentModule, setCurrentModule] = useState(0); // Track current module
    const [step, setStep] = useState<number>(1);
    const nav = useNavigate();
    useEffect(() => {
        const numberOfModules = form.getFieldValue("number_of_module");
        setModuleNumber(numberOfModules || 1);
    }, [form]);

    useEffect(() => {
        const numberOfModules = form.getFieldValue("number_of_modules");
        setModuleNumber(numberOfModules || 1);
    }, [form]);

    const handleValuesChange = () => {
        const numberOfModules = form.getFieldValue("number_of_modules");
        setModuleNumber(numberOfModules || 1);
    };

    const handleNext = () => {
        setCourse((prevCourse: CourseProps | null): CourseProps => ({
            ...(prevCourse ?? {}), // Ensure previous data exists
            ...(form.getFieldsValue() as CourseProps), // Store the current step’s data
        }));
        setStep(step + 1); // Move to the next step
    };

    const onFinish = async (values: any) => {
        try {
            setLoading(true);

            // Prepare FormData
            const formData = new FormData();

            // Dynamically append form fields to FormData
            Object.entries({ ...course, ...values }).forEach(([key, value]: any) => {
                formData.append(key, value);
            });

            // Submit FormData
            await TutorRequest.createCourse(formData);

            // Navigate & Notify
            nav(URL.COURSES);
            toast.success("Course created successfully.");
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("An error occurred while submitting the form.");
        } finally {
            setLoading(false);
        }
    };

    const handleNextModule = () => {
        if (currentModule < moduleNumber - 1) {
            setCurrentModule(currentModule + 1);
            setCourse((prevCourse: CourseProps | null): CourseProps => ({
                ...(prevCourse ?? {}), // Ensure previous data exists
                ...(form.getFieldsValue() as CourseProps), // Store the current step’s data
            }));
        } else {
            // Submit logic
            form.submit();
        }
    };

    const handleBackModule = () => {
        if (currentModule > 0) {
            setCurrentModule(currentModule - 1);
        } else {
            setStep(1); // Go back to the previous step
        }
    };

    if (step === 1) {
        return (
            <Layout title="Courses">
                <div className="flex flex-col sm:flex-row gap-2 my-[28px] items-start">
                    <div className="w-full sm:w-1/2">
                        <div>
                            <h3 className="mb-[10px] text-[24px] font-semibold">
                                Upload Course
                            </h3>
                            <p className="text-[#666666] text-[16px] w-full lg:w-[72%]">
                                Input your course details here
                            </p>
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                        <Form
                            layout="vertical"
                            form={form}
                            onValuesChange={handleValuesChange}
                            initialValues={{number_of_module: 1}}
                        >
                            <Form.Item
                                label="Course Category"
                                className="inter-normal"
                                name={"course_category"}
                            >
                                <Select
                                    placeholder="Select a Category"
                                    className="!p-[20px] inter-bold bg-[#fff] !text-black !outline-none !hover:border-none !border-none rounded-[6px]"
                                    onChange={(value: any) => {
                                        value === "Learning Development"
                                            ? setCategory("learning")
                                            : setCategory("social");
                                    }}
                                >
                                    <Select.Option value="Learning Development">
                                        Learning Development
                                    </Select.Option>
                                    <Select.Option value="Learning Career">
                                        Entrepreneurship and Innovation
                                    </Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Course Type "
                                className="inter-normal"
                                name={"course_type"}
                            >
                                <Select
                                    placeholder="Select a Type"
                                    className="!p-[20px] inter-bold bg-[#fff] !text-black !outline-none !hover:border-none !border-none rounded-[6px]"
                                    onChange={(value) => {
                                        value == "Applied Science"
                                            ? setType("applied_science_data")
                                            : value === "Formal Science"
                                                ? setType("formal_science_data")
                                                : value === "Natural Science"
                                                    ? setType("natural_science_data")
                                                    : value === "Social Science"
                                                        ? setType("social_science_data")
                                                        : setType("humanities_data");
                                    }}
                                >
                                    {category === "learning" ? (
                                        <>
                                            <Select.Option value="Applied Science">
                                                Applied Science
                                            </Select.Option>
                                            <Select.Option value="Formal Science">
                                                Formal Science
                                            </Select.Option>
                                            <Select.Option value="Humanities">
                                                Humanities
                                            </Select.Option>
                                            <Select.Option value="Natural Science">
                                                Natural Science
                                            </Select.Option>
                                            <Select.Option value="Social Science">
                                                Social Science
                                            </Select.Option>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Course Name"
                                className="inter-normal"
                                name={"course_name"}
                            >
                                <Select
                                    placeholder="Select a Type"
                                    className="!p-[20px] inter-bold bg-[#fff] !text-black !outline-none !hover:border-none !border-none rounded-[6px]"
                                    onChange={(value) => {
                                        value == "Applied Science"
                                            ? setType("applied_science_data")
                                            : value === "Formal Science"
                                                ? setType("formal_science_data")
                                                : value === "Natural Science"
                                                    ? setType("natural_science_data")
                                                    : value === "Social Science"
                                                        ? setType("social_science_data")
                                                        : setType("humanities_data");
                                    }}
                                >
                                    {category === "learning" ? (
                                        <>
                                            <Select.Option value="Applied Science">
                                                Applied Science
                                            </Select.Option>
                                            <Select.Option value="Formal Science">
                                                Formal Science
                                            </Select.Option>
                                            <Select.Option value="Humanities">
                                                Humanities
                                            </Select.Option>
                                            <Select.Option value="Natural Science">
                                                Natural Science
                                            </Select.Option>
                                            <Select.Option value="Social Science">
                                                Social Science
                                            </Select.Option>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Course Title"
                                className="inter-normal"
                                name={"course_title"}
                            >
                                <Select
                                    placeholder="Select a Title"
                                    className="!p-[20px] inter-bold bg-[#fff] !text-black !outline-none !hover:border-none !border-none rounded-[6px]"
                                >
                                    {type === "applied_science_data"
                                        ? applied_science_data.map((title) => {
                                            return (
                                                <Select.Option key={title}>{title}</Select.Option>
                                            );
                                        })
                                        : type === "formal_science_data"
                                            ? formal_science_data.map((title) => {
                                                return (
                                                    <Select.Option key={title}>{title}</Select.Option>
                                                );
                                            })
                                            : type === "natural_science_data"
                                                ? natural_science_data.map((title) => {
                                                    return (
                                                        <Select.Option key={title}>{title}</Select.Option>
                                                    );
                                                })
                                                : type === "social_science_data"
                                                    ? social_science_data.map((title) => {
                                                        return (
                                                            <Select.Option key={title}>{title}</Select.Option>
                                                        );
                                                    })
                                                    : type === "humanities_data"
                                                        ? humanities_data.map((title) => {
                                                            return (
                                                                <Select.Option key={title}>{title}</Select.Option>
                                                            );
                                                        })
                                                        : ""}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Brief about the course"
                                className="inter-normal"
                                name={"brief"}
                            >
                                <Input.TextArea
                                    className="p-2"
                                    placeholder="Write a short descr. about course"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Number of Modules"
                                className="inter-normal"
                                name={"number_of_modules"}
                            >
                                <Select
                                    defaultValue={1}
                                    className="!p-[20px] inter-bold bg-[#fff] !text-black !outline-none !hover:border-none !border-none rounded-[6px]"
                                >
                                    <Select.Option value={1}>1</Select.Option>
                                    <Select.Option value={2}>2</Select.Option>
                                    <Select.Option value={3}>3</Select.Option>
                                    <Select.Option value={4}>4</Select.Option>
                                    <Select.Option value={5}>5</Select.Option>
                                </Select>
                            </Form.Item>
                            {Array.from({length: moduleNumber}, (_, i) => (
                                <Form.Item
                                    label={`Module ${i + 1}`}
                                    key={i}
                                    className="inter-normal"
                                    name={`module_${i + 1}_description`}
                                >
                                    <Input
                                        className="p-[12px]"
                                        placeholder={`Write a short description (max word of 200)`}
                                    />
                                </Form.Item>
                            ))}
                            <div className="flex gap-2 my-[26px] justify-end">
                                <Button
                                    type="link"
                                    className="bg-[#581A57] p-3 px-8 !hover:bg-[#581A57] ml-[10px] text-[#fff] text-[14px] rounded-[8px]"
                                    onClick={handleNext}
                                >
                                    Next
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </Layout>
        );
    } else if (step === 2) {
        return (
            <Layout
                title={
                    <>
                        <ArrowLeftOutlined/> <span>Courses</span>
                    </>
                }
                onclick={() => setStep(1)}
            >
                <div className="flex flex-col sm:flex-row gap-2 my-[28px] items-start">
                    <div className="w-full sm:w-1/2 pr-5">
                        <div>
                            <div className={"flex gap-20 items-center justify-between"}>
                                <h3 className="mb-[10px] text-[24px] font-semibold">
                                    Upload Course Breakdown
                                </h3>
                                <p>
                                    <span className={"text-2xl"}>{currentModule + 1}</span>
                                    <span>{`/${moduleNumber}`}</span>
                                </p>
                            </div>
                            <p className="text-[#666666] text-[16px] w-full lg:w-[72%]">
                                Input your course contents here
                            </p>
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                        <div className="bg-white text-center py-3 mb-4 text-[20px] inter-normal font-medium">
                            Orientation
                        </div>
                        <Form
                            layout="vertical"
                            form={form}
                            onValuesChange={handleValuesChange}
                            onFinish={onFinish}
                        >

                            {/* Additional Resources Upload */}
                            <Form.Item label="Additional Resources"
                                       name={`module_${currentModule + 1}_additional_resources`}>
                                <Upload beforeUpload={handleBeforeUpload} multiple={false}>
                                    <Button icon={<UploadOutlined/>}>Upload (max file size: 20MB - .pdf, .docx, .ppt,
                                        .xl)</Button>
                                </Upload>
                            </Form.Item>

                            {/* Title/Heading */}
                            <Form.Item label="Title/Heading" name={`module_${currentModule + 1}_title`}>
                                <Input placeholder="Enter title"/>
                            </Form.Item>

                            {/* Upload Image/Video */}
                            <Form.Item label="Upload Image/Video" name={`module_${currentModule + 1}_media`}>
                                <Upload beforeUpload={handleBeforeUpload} multiple={false}>
                                    <Button icon={<UploadOutlined/>}>Upload (max file size: 20MB - .pdf, .docx, .ppt,
                                        .xl) 500PX/500PX</Button>
                                </Upload>
                            </Form.Item>


                            {/* Body */}
                            <Form.Item label="Body" name={`module_${currentModule + 1}_body`}>
                                <Input.TextArea placeholder="Enter content here"/>
                            </Form.Item>

                            {/* Navigation Buttons */}
                            <div className="flex gap-2 my-[26px] justify-between">
                                <Button type="default" onClick={handleBackModule}>Back</Button>
                                <Button type="primary" onClick={handleNextModule}>
                                    {currentModule === Array(moduleNumber).fill((null)).length - 1 ? "Submit" : "Next"}
                                </Button>
                            </div>
                        </Form>

                    </div>
                </div>
            </Layout>
        );
    } else {
        return (
            <Layout
                title={
                    <>
                        <ArrowLeftOutlined/> <span>Courses</span>
                    </>
                }
                onclick={() => setStep(1)}
            >
                <div className="flex flex-col sm:flex-row gap-2 my-[28px] items-start">
                    <div className="w-full sm:w-1/2 pr-5">
                        <div>
                            <div className={"flex gap-20 items-center justify-between"}>
                                <h3 className="mb-[10px] text-[24px] font-semibold">
                                    Upload Course Breakdown
                                </h3>
                                <p>
                                    <span className={"text-2xl"}>{currentModule + 1}</span>
                                    <span>{`/${moduleNumber}`}</span>
                                </p>
                            </div>
                            <p className="text-[#666666] text-[16px] w-full lg:w-[72%]">
                                Make sure your course is catchy and descriptive as possible
                            </p>
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                        {/* Dynamic Module Title */}
                        <div className="bg-white text-center py-3 mb-4 text-[20px] inter-normal font-medium">
                            Orientation
                        </div>

                        <Form layout="vertical" form={form} onValuesChange={() => {
                        }}>
                            {/* Additional Resources Upload */}
                            <Form.Item label="Additional Resources" name={`additional_resources_${currentModule}`}>
                                <Upload>
                                    <Button icon={<UploadOutlined/>}>Upload (max file size: 20MB - .pdf, .docx, .ppt,
                                        .xl)</Button>
                                </Upload>
                            </Form.Item>

                            {/* Title/Heading */}
                            <Form.Item label="Title/Heading" name={`title_${currentModule}`}>
                                <Input placeholder="Enter title"/>
                            </Form.Item>

                            {/* Upload Image/Video */}
                            <Form.Item label="Upload Image/Video" name={`media_${currentModule}`}>
                                <Upload>
                                    <Button icon={<UploadOutlined/>}>Upload (max file size: 20MB - .pdf, .docx, .ppt,
                                        .xl) 500PX/500PX</Button>
                                </Upload>
                            </Form.Item>

                            {/* Body */}
                            <Form.Item label="Body" name={`body_${currentModule}`}>
                                <Input.TextArea placeholder="Enter content here"/>
                            </Form.Item>

                            {/* Navigation Buttons */}
                            <div className="flex gap-2 my-[26px] justify-between">
                                <Button type="default" onClick={handleBackModule}>Back</Button>
                                <Button type="primary" onClick={handleNextModule} disabled={loading} loading={loading}>
                                    {currentModule === Array(moduleNumber).fill((null)).length - 1 ? "Submit" : "Next"}
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </Layout>
        );

    }
};

export default CreateCoursePage;
