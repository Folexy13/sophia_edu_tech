import React from "react";
import { Footer, Navbar } from "../../components";
import "./Termspage.styles.scss";
import { Card } from "antd";

const PrivacyPage: React.FC = () => {
	return (
		<div className="privacy">
			<div className="contain">
				<Navbar />
				<h2>Terms of use</h2>
				<Card bordered={false} style={{ width: "100%" }} hoverable>
					<h3 className="inter-bold" style={{ color: "#581A57" }}>
						Introduction
					</h3>
					<p className="inter-normal">Last Updated Date: September 01, 2024</p>
					<p className="inter-normal">
						Sophia Edu, Inc. ({<span className="font-bold">"Sophia"</span>} or
						{<span className="font-bold">"we"</span>}) provides a learning
						platform, career development, and social networking service that
						empowers users, including higher education students, academics, and
						professionals, to create user accounts, access academic skills and
						career development courses, and connect with potential investors and
						employers globally (referred to as the “Services”) through our
						website, available at sophiaonline.net (the “Site”). Kindly read
						through the following terms of use (“Terms”) along with our “Privacy
						Policy”. These Terms govern your use of and access to the Site,
						Services, and Collective Content (as defined below), establishing a
						binding legal agreement between you and Sophia.
					</p>
					<p className="inter-normal">
						Sophia is an ambitious for-profit Education Technology social
						enterprise offering tailored preparatory training on relevant
						academic skills and practices for prospective higher education
						students and practitioners (undergraduate, postgraduate and research
						students) in highly regarded universities and colleges around the
						world, including those domiciled in top study destination countries
						for international students.
					</p>
					<h3 className="inter-bold" style={{ color: "#581A57" }}>
						Sensitive Peronal Data
					</h3>
					<p className="inter-normal">
						Sophia is an ambitious for-profit Education Technology social
						enterprise offering tailored preparatory training on relevant
						academic skills and practices for prospective higher education
						students and practitioners (undergraduate, postgraduate and research
						students) in highly regarded universities and colleges around the
						world, including those domiciled in top study destination countries
						for international students.
					</p>
					<p className="inter-normal">
						Sophia is an ambitious for-profit Education Technology social
						enterprise offering tailored preparatory training on relevant
						academic skills and practices for prospective higher education
						students and practitioners (undergraduate, postgraduate and research
						students) in highly regarded universities and colleges around the
						world, including those domiciled in top study destination countries
						for international students.
					</p>
					<p className="inter-normal">
						Sophia is an ambitious for-profit Education Technology social
						enterprise offering tailored preparatory training on relevant
						academic skills and practices for prospective higher education
						students and practitioners (undergraduate, postgraduate and research
						students) in highly regarded universities and colleges around the
						world, including those domiciled in top study destination countries
						for international students.
					</p>
				</Card>
			</div>
			<Footer />
		</div>
	);
};

export default PrivacyPage;
