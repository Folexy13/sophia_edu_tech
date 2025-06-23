import React, {useEffect, useState} from "react";
import Layout from "../../DashboardLayout";

import {Button, Form, Input, Select, Upload} from "antd";
import {
    applied_science_data,
    formal_science_data,
    humanities_data,
    natural_science_data,
    social_science_data,
    URL,
} from "../../../utils/constants";
import {ArrowLeftOutlined, UploadOutlined} from "@ant-design/icons";
import {CourseProps, useCourse} from "../../../store.tsx";
import {toast} from "react-toastify";
import {TutorRequest} from "../../../requests";
import {useNavigate} from "react-router-dom";
import {RichTextEditor} from "../../../components/editor.tsx";
import {formatModulePayload} from "../../../utils/helperFunction.tsx";
import tutorRequests from "../../../requests/tutor.request.tsx";
import {message} from "antd"

const handleBeforeUpload = (file:any) => {
    const allowedTypes = ['application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

    const maxSize = 20 * 1024 * 1024; // 20MB

    if (!allowedTypes.includes(file.type)) {
        message.error('Invalid file type! Please upload a .pdf, .docx, .ppt, or .xl file.');
        return Upload.LIST_IGNORE;
    }

    if (file.size > maxSize) {
        message.error('File is too large! Maximum size allowed is 20MB.');
        return Upload.LIST_IGNORE;
    }

    return false; // File passes validation
};
const CreateCoursePage: React.FC = () => {
        const [form] = Form.useForm();
        const [moduleNumber, setModuleNumber] = useState<number>(1);
        const [category, setCategory] = useState<string>("");
        const {course, setCourse} = useCourse();
        const [loading, setLoading] = useState<boolean>(false);        
        const [type, setType] = useState<string>("");
        const [currentModule, setCurrentModule] = useState(0); // Track current module
        const [step, setStep] = useState<number>(1);
        const [courseTitles, setCourseTitles] = useState<string[]>(['']); // Array to store multiple course titles
        const nav = useNavigate();


        useEffect(() => {
            const numberOfModules = form.getFieldValue("number_of_module");
            setModuleNumber(numberOfModules || 1);
        }, [form]);

        useEffect(() => {
            const numberOfModules = form.getFieldValue("number_of_modules");
            setModuleNumber(numberOfModules || 1);
        }, [form]);

        // Initialize form with persisted values
        useEffect(() => {
            if (course) {
                form.setFieldsValue(course);
                if (course.number_of_module) {
                    setModuleNumber(course.number_of_module);
                }
            }
        }, [course, form]);

        const handleValuesChange = () => {
            const numberOfModules = form.getFieldValue("number_of_modules");
            setModuleNumber(numberOfModules || 1);
        };        const handleNext = async () => {
            setLoading(true);
            try {
                const formValues = form.getFieldsValue();
                
                // Create a new object with all form values and the course titles
                const updatedFormValues = {
                    ...formValues,
                    course_title: courseTitles.filter(title => title.trim()).join(', ')
                };
                
                const addedCourse: any = course?.id 
                    ? {course_id: course.id} 
                    : await TutorRequest.createCourse(updatedFormValues);

                setCourse((prevCourse: CourseProps | null): CourseProps => {

                    // If we already have a course with this ID, update it
                    if (prevCourse?.id === addedCourse.course_id) {
                        return {
                            ...prevCourse,
                            ...updatedFormValues, // Merge existing course with new form values
                        };
                    }

                    // Otherwise create a new course entry with the ID
                    return {
                        ...updatedFormValues,
                        id: addedCourse.course_id, // Store the ID from the API response
                    };
                });

                setStep(step + 1);
            } catch (error) {
                console.error("Error creating course:", error);
                // Consider adding error handling/notification here
            } finally {
                setLoading(false);
            }
        };        const onFinish = async (values: any) => {
            try {
                setLoading(true);

                // Prepare FormData
                const formData = new FormData();

                // Create updated values with course titles
                const updatedValues = {
                    ...values,
                    course_title: courseTitles.filter(title => title.trim()).join(', ')
                };

                // Dynamically append form fields to FormData
                Object.entries({...course, ...updatedValues}).forEach(([key, value]: any) => {
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

        const formdataModulePayload = (formValues:any, courseId:string ) => {
            const formData = new FormData();

            // Append course ID if available
            if (courseId) {
                formData.append('course_id', courseId);
            }

            // Append form fields
            Object.keys(formValues).forEach(key => {
                if (formValues[key]) {
                    formData.append(key, formValues[key]);
                }
            });

            // Handle file uploads properly
            if (formValues.additional_resources?.file) {
                formData.append('file', formValues.additional_resources.file);
            }

            return formData; // Now it’s ready for backend handling
        };

// Update handleNextModule to use FormData
        const handleNextModule = async () => {
            const payload = formatModulePayload(form.getFieldsValue(), String(course?.id));
            const data = formdataModulePayload(payload, String(course?.id))

            try {
                await tutorRequests.createCourseModule(data); // Sends FormData
                if (currentModule < moduleNumber - 1) {
                    setCurrentModule(currentModule + 1);
                    setCourse((prevCourse) => ({
                        ...(prevCourse ?? {}),
                        ...(form.getFieldsValue()),
                    }));
                }
            } catch (e) {
                console.error("Error creating module:", e);
            } finally {
                setLoading(false);
            }
        };
        const handleBackModule = () => {
            if (currentModule > 0) {
                setCurrentModule(currentModule - 1);
            } else {
                setStep(1); // Go back to the previous step
            }
        };

        console.log(course)

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
                                </Form.Item>                                <Form.Item
                                    label="Course Type"
                                    className="inter-normal"
                                    name={"course_type"}
                                >
                                    <Input
                                        placeholder="Enter Course Type"
                                        className="p-2"
                                    />
                                </Form.Item>                                <Form.Item
                                    label="Course Name"
                                    className="inter-normal"
                                    name={"course_name"}
                                >
                                    <Input
                                        placeholder="Enter Course Name"
                                        className="p-2"
                                    />
                                </Form.Item>                                <Form.Item label="Course Title" className="mb-0">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#666666]">Add Course Titles</span>
                                        <Button 
                                            className="text-[#581A57]" 
                                            type="link" 
                                            onClick={() => setCourseTitles([...courseTitles, ''])}
                                        >
                                            + Add Title
                                        </Button>
                                    </div>
                                </Form.Item>
                                {courseTitles.map((title, index) => (
                                    <Form.Item 
                                        key={index}
                                        className="inter-normal mb-2"
                                    >
                                        <div className="flex items-center">
                                            <Input 
                                                placeholder={`Enter title ${index + 1}`} 
                                                className="p-2" 
                                                value={title}
                                                onChange={(e) => {
                                                    const newTitles = [...courseTitles];
                                                    newTitles[index] = e.target.value;
                                                    setCourseTitles(newTitles);
                                                }}
                                            />
                                            {courseTitles.length > 1 && (
                                                <Button 
                                                    className="ml-2 text-red-500" 
                                                    type="link"
                                                    onClick={() => {
                                                        const newTitles = courseTitles.filter((_, i) => i !== index);
                                                        setCourseTitles(newTitles);
                                                    }}
                                                >
                                                    Remove
                                                </Button>
                                            )}
                                        </div>
                                    </Form.Item>
                                ))}
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
                                {/*{Array.from({length: moduleNumber}, (_, i) => (*/}
                                {/*    <Form.Item*/}
                                {/*        label={`Module ${i + 1}`}*/}
                                {/*        key={i}*/}
                                {/*        className="inter-normal"*/}
                                {/*        name={`module_${i + 1}_description`}*/}
                                {/*    >*/}
                                {/*        <Input*/}
                                {/*            className="p-[12px]"*/}
                                {/*            placeholder={`Write a short description (max word of 200)`}*/}
                                {/*        />*/}
                                {/*    </Form.Item>*/}
                                {/*))}*/}
                                <div className="flex gap-2 my-[26px] justify-end">
                                    <Button
                                        type="link"
                                        loading={loading}
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
                            {form.getFieldValue(`module_${currentModule + 1}_title`) && (
                                <div className="bg-white text-center py-3 mb-4 text-[20px] inter-normal font-medium">
                                    {form.getFieldValue(`module_${currentModule + 1}_title`).toUpperCase()}
                                </div>
                            )}
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

                                {/* Description */}
                                <Form.Item label="Description" name={`module_${currentModule + 1}_description`}>
                                    <Input placeholder="Enter Description"/>
                                </Form.Item>

                                {/* Upload Image/Video */}
                                <Form.Item label="Upload Image/Video" name={`module_${currentModule + 1}_media`}>
                                    <Upload beforeUpload={handleBeforeUpload} multiple={false}>
                                        <Button icon={<UploadOutlined/>}>Upload (max file size: 20MB - .pdf, .docx, .ppt,
                                            .xl) 500PX/500PX</Button>
                                    </Upload>
                                </Form.Item>


                                {/*<Form.Item label="Body" name={`module_${currentModule + 1}_body`}>*/}
                                <RichTextEditor
                                    name={`module_${currentModule + 1}_body`}
                                    label="Body"
                                    rules={[{required: true, message: 'Please enter content'}]}
                                />


                                {/* Navigation Buttons */}
                                <div className="flex gap-2 my-[26px] justify-between">
                                    <Button type="default" onClick={handleBackModule}>Back</Button>
                                    <Button type="primary" disabled={loading} loading={loading} onClick={handleNextModule}>
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
    }
;

export default CreateCoursePage;
