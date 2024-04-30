import React from "react";
import { Button, Footer, Navbar } from "../../components";
import "./Aboutpage.styles.scss";
import { Col, Row } from "antd";
import {
	badge,
	manWoman,
	office_woman,
	twoWoman,
	whiteBadge,
} from "../../assets";

const AboutPage: React.FC = () => {
	return (
		<div className="about">
			<div className="container">
				<Navbar />
				<h2>About us</h2>
				<p
					className="playfair-display-normal"
					style={{ marginBottom: 18, lineHeight: 2 }}
				>
					Sophia is an ambitious for-profit Education Technology and career
					service social enterprise offering tailored preparatory training on
					relevant academic skills and practices for higher education students
					and practitioners. Sophia equally provides the avenue for learners to
					hone their entrepreneurial skills, while also connecting them to
					potential investors and employers.
				</p>
				<div className="div">
					<Button className="abtBtn">Sign Up</Button>
				</div>
			</div>
			<section>
				<Row
					className="section"
					align="top"
					justify="space-between"
					align-items="center"
					style={{ marginTop: 60 }}
				>
					<Col
						// xs={12}
						// sm={10}
						// md={8}
						// lg={6}
						xl={8}
						style={{ width: "50%" }}
					>
						<p
							className="playfair-display-normal"
							style={{ marginBottom: 18, lineHeight: 2, fontSize: 16 }}
						>
							Sophia came up as a solution to a felt need and challenges
							observed by Sophia founders themselves in the international
							education sector, and to which current services are not solving
							adequately.
						</p>
						<p
							className="playfair-display-normal"
							style={{ marginBottom: 18, lineHeight: 2, fontSize: 16 }}
						>
							“Sophia” borrowed its name from the Greek word “Σοφία” or “Sophía”
							which means "Wisdom". The idea behind Sophia is not to provide
							learners with any specific subject knowledge; instead, as the
							platform's logo suggests, Sophia is aimed at providing the
							scaffolding with which learners could see what is lying out there
							in terms of knowledge, wisdom and understanding in their chosen
							fields of study. Read more
						</p>
					</Col>
					<Col
						xs={12}
						sm={10}
						md={8}
						lg={6}
						xl={10}
						style={{
							width: "50%",
							textAlign: "center",
						}}
					>
						<img
							src={office_woman}
							alt="Office-Woman-on-call-pic"
							style={{ maxWidth: "100%", maxHeight: "100%", height: "auto" }}
						/>
					</Col>
				</Row>
			</section>
			<section style={{ background: "#f5f5f5" }}>
				<Row
					className="section"
					align="top"
					// justify="space-between"
					align-items="center"
					style={{ marginTop: 60, gap: 80 }}
				>
					<Col
						xs={12}
						sm={10}
						md={8}
						lg={6}
						xl={10}
						style={{
							width: "50%",
							textAlign: "center",
						}}
					>
						<img
							src={twoWoman}
							alt="Office-Woman-on-call-pic"
							style={{ maxWidth: "100%", maxHeight: "100%", height: "auto" }}
						/>
					</Col>
					<Col
						xs={12}
						sm={10}
						md={8}
						lg={10}
						xl={12}
						style={{ width: "100%", marginTop: 30 }}
					>
						<img src={badge} width={30} alt="" style={{ marginBottom: 10 }} />
						<h2 style={{ marginBottom: 10 }}>Mission</h2>
						<p
							className="playfair-display-normal"
							style={{ marginBottom: 18, lineHeight: 2, fontSize: 16 }}
						>
							To provide inclusive and equitable access to quality higher
							education for youths and adults by equipping them with appropriate
							learning and research skills necessary to improve their learning
							outcomes at their various institutions of study and research.
						</p>
					</Col>
				</Row>
			</section>
			<section
				style={{ background: "#581A57", color: "#fff", margin: "150px 0" }}
			>
				<Row
					className="section"
					align="top"
					// justify="space-between"
					align-items="center"
					style={{ marginTop: 60, gap: 80 }}
				>
					<Col
						xs={12}
						sm={10}
						md={8}
						lg={6}
						xl={10}
						style={{
							width: "50%",
							textAlign: "center",
						}}
					>
						<img
							src={manWoman}
							alt="Office-Woman-on-call-pic"
							style={{ maxWidth: "100%", maxHeight: "100%", height: "auto" }}
						/>
					</Col>
					<Col
						xs={12}
						sm={10}
						md={8}
						lg={10}
						xl={12}
						style={{ width: "100%", marginTop: 30 }}
					>
						<img
							src={whiteBadge}
							width={30}
							alt=""
							style={{ marginBottom: 10 }}
						/>
						<h2 style={{ marginBottom: 10 }}>Vision</h2>
						<p
							className="playfair-display-normal"
							style={{ marginBottom: 18, lineHeight: 2, fontSize: 16 }}
						>
							To substantially increase the number of youths and adults who have
							relevant skills and knowledge for employment, decent jobs and
							entrepreneurship.
						</p>
					</Col>
				</Row>
			</section>
			<Footer />
		</div>
	);
};

export default AboutPage;
