import { Col, Row } from "antd";
import React from "react";
import { woman } from "../../assets";
import { Accordion, Button, Footer, Navbar } from "../../components";
import "./Homepage.styles.scss";
import {
	applied_science_data,
	formal_science_data,
	humanities_data,
	natural_science_data,
	social_science_data,
} from "../../constants";

const HomePage: React.FC = () => {
	return (
		<div className="homepage">
			<div className="hero">
				<Navbar />
				<Row
					className="hero-text"
					align="top"
					justify="space-between"
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
						<h2
							className="playfair-display-bold"
							style={{ fontSize: 48, marginBottom: 18 }}
						>
							The integrated learning development platform.
						</h2>
						<p
							className="playfair-display-normal"
							style={{ marginBottom: 18, lineHeight: 2 }}
						>
							Learn the most important skills to succeed in your chosen course
							of study and connect with researchers with similar interests.
							Transform your research into an enterprising venture. Earn money
							and connect with potential investors, collaborators, and
							employers!
						</p>
						<Button>Sign Up</Button>
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
							src={woman}
							alt="Graduate-Woman-pic"
							style={{ maxWidth: "100%", maxHeight: "100%", height: "auto" }}
						/>
					</Col>
				</Row>
			</div>
			<section className="dev">
				<div className="compartment">
					<h2 className="playfair-display-bold">
						Explore our top learning and research interests
					</h2>
					<Row
						style={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<Col
							xs={24}
							sm={24}
							md={12}
							lg={12}
							xl={12}
							style={{ width: "50%" }}
						>
							<h3
								className="playfair-display-normal"
								style={{ marginBottom: 18, lineHeight: 2 }}
							>
								Learning Development courses
							</h3>
						</Col>
						<Col
							xs={24}
							sm={24}
							md={12}
							lg={12}
							xl={12}
							style={{ width: "50%", textAlign: "center" }}
						>
							<Accordion title="Applied Science" data={applied_science_data} />
							<Accordion title="Formal Science" data={formal_science_data} />
							<Accordion title="Humanities" data={humanities_data} />
							<Accordion title="Natural Science" data={natural_science_data} />
							<Accordion title="Social Science" data={social_science_data} />
						</Col>
					</Row>
				</div>
			</section>
			<section className="diff">
				<div className="compartment">
					<Row
						style={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<Col
							xs={24}
							sm={24}
							md={12}
							lg={12}
							xl={12}
							style={{ width: "50%" }}
						>
							<h2 className="playfair-display-bold">
								Social Entrepreneurship and Innovation courses
							</h2>
						</Col>
						<Col
							xs={24}
							sm={24}
							md={12}
							lg={12}
							xl={12}
							style={{ width: "50%", textAlign: "center", paddingBottom: 30 }}
						>
							<Accordion title="Applied Science" data={applied_science_data} />
							<Accordion title="Formal Science" data={formal_science_data} />
							<Accordion title="Humanities" data={humanities_data} />
							<Accordion title="Natural Science" data={natural_science_data} />
							<Accordion title="Social Science" data={social_science_data} />
						</Col>
					</Row>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default HomePage;
