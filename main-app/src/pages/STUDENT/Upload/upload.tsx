import React, { useState } from "react";
import Layout from "../../Layout";
import { Form, Input, Select } from "antd";
import { Button } from "../../../components";
import type { UploadProps } from "antd";
import { message, Upload as AntDUpload } from "antd";
import { UploadIcon } from "../../../assets";
import "./upload.styles.scss";
import { countWords } from "../../../utils/helperFunction";
import { ClientRequest } from "../../../requests";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { URL } from "../../../utils/constants";

const { Dragger } = AntDUpload;
const { TextArea } = Input; // Import TextArea from Ant Design

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const { Option } = Select;
const Upload: React.FC<any> = () => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [title, setTitle] = useState("");
  const [remainingWords, setRemainingWords] = useState(200); // Track remaining words
  const nav = useNavigate();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("executive_summary", values.executive_summary);
      formData.append("subject", values.subject);
      formData.append("doi_link", values.doi_link);
      formData.append("video_link", values.video_link);
      formData.append("document", values.document_path);

      await ClientRequest.uploadPost(formData);
      toast.success("Uploaded successfully.");
      nav(URL.HOME);
    } catch (e: any) {
      console.log(e);
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value: any) => {
    console.log(`Selected: ${value}`);
  };

  const handleSummaryChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = event.target.value;
    const wordCount = countWords(inputText);

    // Update the remaining words
    const remaining = 200 - wordCount;
    setRemainingWords(remaining);

    // Only update the text if the word count is within the limit
    if (wordCount <= 200) {
      setSummary(inputText);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    const wordCount = countWords(inputText);

    // Only update the text if the word count is within the limit
    if (wordCount <= 20) {
      setTitle(inputText);
    }
  };

  return (
    <Layout>
      <div className="w-[90%] sm:w-3/5 mx-auto upload">
        <h2 className="text-[24px] sm:text-center my-[20px] font-semibold">
          Enterprise Project
        </h2>
        <p className="text-[16px] sm:text-center mb-[20px]">
          Upload your enterprise project here. This may include some or all of the following: business plan or pitch deck that explains the business idea of your project, DOI of research work supporting your project, website or video link explaining your project. We strongly advise that you patent your idea/inventions where possible before you upload or post them to Sophia. By continuing to upload your work/manuscript for review and also by using this site, you agree that Sophia does not have any liability for your work or intellectual property in the case of theft.
        </p>

        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={handleSubmit}>
          <Form.Item label="Title" name={"title"}>
            <Input
              name="title"
              className="p-2"
              placeholder="Enter title (max 20 words)"
              value={title}
              onChange={handleTitleChange}
            />
          </Form.Item>
          <Form.Item label="Executive summary" name={"executive_summary"}>
            <TextArea
              name="executive_summary"
              className="p-2"
              value={summary}
              onChange={handleSummaryChange}
              placeholder="Enter executive summary (max 200 words)"
              rows={4} // Set the number of rows for the textarea
            />
            <div
              style={{
                color: remainingWords >= 0 ? "green" : "red",
                fontSize: "12px",
                marginTop: "5px",
              }}
            >
              {remainingWords >= 0
                ? `${remainingWords} words remaining`
                : "Word limit exceeded"}
            </div>
          </Form.Item>
          <Form.Item label="Document" name={"document_path"}>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon flex justify-center">
                <UploadIcon />
              </p>
              <p className="ant-upload-hint">
                (max file size: 200mb - pdf, docx, ppt, xl)
              </p>
            </Dragger>
          </Form.Item>
          <Form.Item label="Add Links" name="doi_link">
            <Input className="p-2" placeholder="DOI Link" />
          </Form.Item>
          <Form.Item label=" " name="video_link">
            <Input className="p-2 mt-[-10px] mb-[20px]" placeholder="Video Link" />
          </Form.Item>
          <Form.Item label="Subject(s) your project belongs" name={"subject"}>
            <Select
              placeholder="Search Subject"
              className="w-full bg-white h-[38px] rounded-sm"
              onChange={handleChange}
            >
              <Option value="enrolled">Enrolled</Option>
              <Option value="Social Entrepreneurship and Innovation courses">
                Social Entrepreneurship and Innovation courses
              </Option>
              <Option value="Learning Development courses">
                Learning Development courses
              </Option>
              <Option value="applied_science" disabled>
                Others
              </Option>
            </Select>
          </Form.Item>
          <div style={{ marginTop: "20px", textAlign: "right" }}>
            <Button
              label={"Submit"}
              htmlType="submit"
              loading={loading}
              className="p-[20px] w-full sm:w-[200px] bg-[#581A57] text-white mb-[90px]"
            />
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default Upload;
