import React from "react";
import { Footer, Navbar } from "../../components";
import "./Privacypage.styles.scss";
import { Card } from "antd";

const TermsPage: React.FC = () => {
	return (
		<div className="privacy">
			<div className="contain">
				<Navbar />

				<h2>Privacy Policy</h2>
				<Card bordered={false} style={{ width: "100%" }} hoverable>
					<h3 className="inter-bold" style={{ color: "#581A57" }}>
						Introduction
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

export default TermsPage;
