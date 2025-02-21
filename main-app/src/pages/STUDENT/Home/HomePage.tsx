import React, {useState, useEffect} from "react";
import Layout from "../../Layout";
import {truncate} from "lodash";
import {
    AddressLocator,
    CommentIcon,
    DislikeIcon,
    IndicatorIcon,
    LikeIcon,
    PDFIcon,
    ThreeDotsIcon,
} from "../../../assets";
import {Button, Checkout, Modal} from "../../../components";
import { Dropdown, Form, Input, MenuProps, Space, } from "antd";
import {useNavigate} from "react-router-dom";
import {URL} from "../../../utils/constants";
import {useUser} from "../../../store";
import {getAvatar} from "../../../utils/helperFunction";
import {ClientRequest} from "../../../requests";

const HomePage: React.FC = () => {
    const nav = useNavigate();
    const {user} = useUser();
    const [course, setCourse] = useState("");

    const items: MenuProps["items"] = [
        {
            label: <div>Repost</div>,
            key: "1",
        },
        {
            label: <div onClick={() => nav(URL.MESSAGING)}>Message</div>,
            key: "2",
        },
    ];

    const [open, setOpen] = useState(false);
    const [isCheckout, setIsCheckout] = useState(false);
    const [buttonLoading, setButtonLoading] = useState({
        firstBtn: false,
        secondBtn: false,
    });
    const [posts, setPosts] = useState<any>([]);

    useEffect(() => {
        const fetchAllPosts = async () => {
            const resp = await ClientRequest.getPosts()
            console.log(resp)
            setPosts(resp)
        }
        fetchAllPosts();
    }, [])

    const handleTopUpWallet = () => {
        setButtonLoading({
            firstBtn: !buttonLoading.firstBtn,
            secondBtn: buttonLoading.secondBtn,
        });
        setTimeout(() => {
            setButtonLoading({firstBtn: false, secondBtn: buttonLoading.secondBtn});
            setOpen(false);
        }, 2000);
    };
    const handlePayWithWallet = () => {
        setOpen(false);
        setIsCheckout(true);
        setButtonLoading({
            firstBtn: buttonLoading.firstBtn,
            secondBtn: !buttonLoading.secondBtn,
        });
        setTimeout(() => {
            setButtonLoading({firstBtn: buttonLoading.firstBtn, secondBtn: false});
            setOpen(false);
        }, 2000);
    };
    const hasEducation = user?.education?.[0];
    const hasLicensesCertifications = user?.licenses_certifications?.[0];
    const handleModalToggle = (course: string) => {
        setCourse(course);
        setOpen(!open);
    };
    return (
        <Layout>
            <div className="flex lg:flex-row flex-col px-[10px] lg:px-[80px] gap-4 items-start pb-[20px]">
                {/* First Section */}
                <div
                    className="overflow-y-auto order-1  hidden lg:flex w-full flex-[0.25] min-h-[300px] sm:min-h-[400px] bg-white rounded-lg border-[#B6B6B6] border flex-col items-center justify-center">
                    {/* Profile image */}
                    <img
                        src={getAvatar(user?.profile_image)}
                        alt="Profile"
                        className="w-[50px] sm:w-[84px] sm:mt-0 mt-[-40px]"
                        style={{borderRadius: "50%"}}
                    />
                    <p className="font-semibold text-[16px] font-inter leading-[25.89px]">
                        {user?.full_name}
                    </p>
                    <p className="text-[#808080] text-[14px] my-[10px] flex gap-2 items-center">
                        <AddressLocator/>
                        <span className="text-[14px] font-inter leading-[22.4px]">
							Location
						</span>
                    </p>
                    {hasEducation && (
                        <>
                            {hasEducation.degree && (
                                <p className="text-[#666666] font-normal font-inter text-[16px] leading-[25px] my-[10px]">
                                    {hasEducation.degree}
                                </p>
                            )}
                            {hasEducation.field_of_study && (
                                <p className="text-[#666666] font-normal font-inter text-[16px] leading-[25px] my-[10px]">
                                    {truncate(hasEducation.field_of_study, {length: 20})}
                                </p>
                            )}
                        </>
                    )}

                    {hasLicensesCertifications && (
                        <p className="text-[#666666] font-normal font-inter text-[16px] leading-[25px] my-[10px]">
                            {truncate(hasLicensesCertifications.name, {length: 20})}
                        </p>
                    )}

                    <Button
                        label="View Profile"
                        onclick={() => nav(URL.BIO)} // Corrected from onclick to onClick
                        className="text-white bg-[#581A57] p-3 homepage_btn"
                    />
                </div>

                {/* Second Section */}
                <div className="flex-[0.75] order-3 lg:order-2 w-full sm:max-h-[900px] sm:overflow-y-auto">
                    {posts.length > 0 ? (
                        posts.map((post: any, i: number) => (
                            <div
                                key={i}
                                className="min-h-[200px] bg-white rounded-lg p-2 sm:p-4 mb-[10px]"
                            >
                                {/* Post Content */}
                                <div className="flex justify-between items-center border-[#F2F2F2] border-b pb-2">
                                    <div className="flex gap-1 sm:gap-3 items-center">
                                        <img
                                            src={post?.user?.profile_image ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnFRPx77U9mERU_T1zyHcz9BOxbDQrL4Dvtg&s"}
                                            alt="user_image"
                                            className="w-[30px] sm:w-[40px]"
                                        />
                                        <p className="text-[#581A57] font-inter leading-[25.89px] font-medium text-[12px] sm:text-[16px]">
                                            {post.user?.full_name}
                                        </p>
                                        <p className="text-[#808080] text-[10px] sm:text-[14px] leading-[22.4px]">
                                            Uploaded a paper
                                        </p>
                                    </div>
                                    <Dropdown menu={{ items }} trigger={["click"]}>
									<Space>
										<ThreeDotsIcon className="cursor-pointer w-[16px] sm:w-[24px]" />
									</Space>
								</Dropdown>
                                </div>

                                {/* Body */}
                                <div className="flex items-center my-[10px] border-[#F2F2F2] border-b pb-2">
                                    <div className={"flex-[1]"}>
                                        <p className="leading-[25.6px] playfair-display-normal text-[16px] sm:text-[18px]">
                                            {post?.title}
                                        </p>
                                        <p className="text-[12px] leading-[25.89px] font-inter sm:text-[16px] text-[#666666]">
                                            {truncate(post?.executive_summary, { length: 20 })}
                                            {post?.executive_summary.length > 20 && (
                                                <span className="text-[#581a57] cursor-pointer">
                                    see more
                                </span>
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <PDFIcon
                                            onClick={() => handleModalToggle("Lorem Ipsum")}
                                            className="w-[40px] sm:w-[61px] cursor-pointer"
                                        />
                                    </div>
                                </div>
                                {/* Footer */}
                                <div className="flex justify-between items-center text-[xx-small] sm:text-[small]">
                                    <div className="flex gap-1 sm:gap-2 items-center ">
                                        <p className="flex flex-col sm:flex-row font-inter font-[300] leading-[12.1px] lg:text-[12px] text-[8px] gap-1 sm:gap-2 items-center">
                                            <LikeIcon className="w-[10px] sm:w-[12px]" />
                                            <span>Upvote</span>
                                        </p>

                                        <p className="flex flex-col sm:flex-row font-inter font-[300] leading-[12.1px] lg:text-[12px] text-[8px] gap-1 sm:gap-2 items-center">
                                            <DislikeIcon className="w-[10px] sm:w-[12px]" />
                                            <span>Downvote</span>
                                        </p>
                                        <p className="flex flex-col sm:flex-row font-inter font-[300] leading-[12.1px] lg:text-[12px] text-[8px] gap-1 sm:gap-2 items-center">
                                            <CommentIcon className="w-[10px] sm:w-[12px]" />
                                            <span>Comment</span>
                                        </p>
                                    </div>

                                    <div className="flex  gap-1 sm:gap-2 items-center">
                                        <p className="flex flex-col sm:flex-row font-inter font-[300] leading-[12.1px] lg:text-[12px] text-[8px] gap-1 sm:gap-2 items-center">
										<span
                                            style={{ visibility: "hidden" }}
                                            className="sm:!hidden"
                                        >
											<IndicatorIcon color="#2D2D2D" />
										</span>
                                            <span> 10 Upvote</span>
                                        </p>

                                        <p className="flex flex-col sm:flex-row font-inter font-[300] leading-[12.1px] lg:text-[12px] text-[8px] gap-1 sm:gap-2 items-center">
                                            <IndicatorIcon color="#2D2D2D" />
                                            <span>100 Downvote</span>
                                        </p>
                                        <p className="flex flex-col sm:flex-row font-inter font-[300] leading-[12.1px] lg:text-[12px] text-[8px] gap-1 sm:gap-2 items-center">
                                            <IndicatorIcon color="#2D2D2D" />
                                            <span>100 Comments</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="min-h-[200px] bg-white rounded-lg p-2 sm:p-4 mb-[10px] flex flex-col items-center justify-center">
                            <img
                                src="/assets/empty-post.svg" // Replace with the correct path to your empty state SVG
                                alt="No Posts"
                                className="w-[100px] h-[100px] mb-4"
                            />
                            <p className="text-[#808080] text-[14px] sm:text-[16px] font-inter">
                                No posts available. Start sharing your first post!
                            </p>
                        </div>
                    )}
                </div>

                {/* Third Section */}
                <div
                    className="hidden md:block sm:overflow-y-auto order-2 lg:order-3 w-full lg:w-fit sm:flex-[0.25] sm:max-h-[500px] p-2 pt-0 rounded-lg bg-white relative">
                    <h2 className="text-[14px] leading-[32px] sm:text-[20px] font-inter border-[#F2F2F2] border-b pb-2 mb-2 sticky top-0 bg-white z-10">
                        Recently Read
                    </h2>
                    <div className="overflow-y-auto">
                        {Array.from({length: 6}).map((_, i) => (
                            <div
                                className="bg-[#F5F5F5] p-2 rounded-sm mb-2 cursor-pointer"
                                key={i}
                            >
                                <p className="playfair-display-normal text-[#121212] leading-[25.6px] text-[14px] sm:text-[16px]">
                                    Lorem ipsum dolor sit amet consectetur. Pretium scelerisque
                                    velit sollicitudin id.
                                </p>
                                <p className="text-[#808080] text-[14px] font-inter leading-[22.4px]">
                                    Aluko Opeyemi
                                </p>
                                <p className="text-[#808080] text-[14px] font-inter leading-[22.4px]">
                                    2014
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Modal
                isOpen={open}
                onClose={() => setOpen(!open)}
                className="card-modal"
                title="Proceed to Payment"
                cancelText="Top Up Wallet"
                okText="Pay with wallet"
            >
                <Form layout="vertical">
                    <Form.Item label="Course Title">
                        <Input name="course" value={course} readOnly/>
                    </Form.Item>
                    <Form.Item label="Amount">
                        <Input name="amount" placeholder="$25" value={"$25"} readOnly/>
                    </Form.Item>
                </Form>
                <div style={{marginTop: "20px", textAlign: "right"}}>
                    <Button
                        loading={buttonLoading.secondBtn === true}
                        onclick={handlePayWithWallet}
                        label="Pay with wallet"
                        className="mr-[10px] p-[8px] bg-[#581A57] text-white"
                    />
                    <Button
                        onclick={handleTopUpWallet}
                        loading={buttonLoading.firstBtn === true}
                        label="Top up wallet"
                        className="text-[#581A57] p-[8px] bg-[#E6DDE6]"
                    />
                </div>
            </Modal>
            <Modal
                isOpen={isCheckout}
                onClose={() => setIsCheckout(!isCheckout)}
                className="card-modal"
                title="Make Payment"
                cancelText=""
                okText=""
            >
                <Checkout amount="25"/>
            </Modal>
        </Layout>
    );
};

export default HomePage;
