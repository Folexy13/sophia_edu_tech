import { jwtDecode } from "jwt-decode";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Define the interface for the JWT payload
interface JwtPayload {
	exp: number;
	iat: number;
	sub: string; // Customize based on your token's payload structure
	[key: string]: any; // Allow other dynamic properties
}

export const getRandomItem = (array: string[]) =>
	array[Math.floor(Math.random() * array.length)];

export const getRandomDate = () => {
	const start = new Date(2022, 0, 1);
	const end = new Date();
	const date = new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	);
	return `${date.getFullYear()}-${
		date.getMonth() + 1
	}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}pm`;
};

export const getAvatar = (avatar?: string) => {
	if (avatar) {
		return avatar;
	} else {
		return "https://p7.hiclipart.com/preview/247/564/869/computer-icons-user-profile-clip-art-user-avatar-thumbnail.jpg";
	}
};

export const clearAllCookies = () => {
	const cookies = document.cookie.split(";");

	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i];
		const eqPos = cookie.indexOf("=");
		const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
	}
};

export const getTokenData = (token: string): JwtPayload | null => {
	try {
		return jwtDecode<JwtPayload>(token);
	} catch (error) {
		console.error("Invalid token:", error);
		return null;
	}
};

export const countWords = (text: string): number => {
	// Trim the text and split it by spaces or other word delimiters
	return text.trim().split(/\s+/).filter(Boolean).length;
};

export const uploadImageToCloudinary = async (file: any) => {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("upload_preset", "cnu26mth"); // Cloudinary upload preset

	try {
		const response = await axios.post(
			"https://api.cloudinary.com/v1_1/djl1v3zvi/image/upload", // Cloudinary URL
			formData
		);
		return response.data.secure_url; // Return the uploaded image URL
	} catch (error) {
		throw new Error("Failed to upload image");
	}
};

export const exportToExcel = (payload: any) => {
	const worksheet = XLSX.utils.json_to_sheet(payload.data);
	const workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
	const excelBuffer = XLSX.write(workbook, {
		bookType: "xlsx",
		type: "array",
	});
	const dataBlob = new Blob([excelBuffer], {
		type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
	});
	saveAs(
		dataBlob,
		payload.fileName ? payload.fileName + ".xlsx" : "table-data.xlsx"
	);
};
