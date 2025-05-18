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

export const removeDuplicates = (obj: Record<string, any>): Record<string, any> => {
	return Object.keys(obj).reduce((acc, key) => {
		acc[key] = obj[key]; // Always assign the latest value
		return acc;
	}, {} as Record<string, any>);
};


 /**
 * Converts frontend module data to API payload format
 * @param {Object} moduleData - Frontend module data (e.g., module_1_title, module_1_description)
 * @param {string} courseId - The ID of the course this module belongs to
 * @returns {Object} - Formatted payload for API request
 */
 export function formatModulePayload(moduleData:any, courseId:any) {
	// Extract the base property names (remove the module_1_ prefix)
	const properties :any= {};
	for (const key in moduleData) {
		if (key.startsWith('module_1_')) {
			const newKey = key.replace('module_1_', '');
			properties[newKey] = moduleData[key];
		}
	}

	// Map to the API payload structure
	const payload :any= {
		name: properties.title || '', // Using title as name if not provided separately
		course_id: courseId,
		description: properties.description || undefined,
		title: properties.title || undefined,
		content: properties.body || undefined,
		additional_resources: properties.additional_resources !== undefined ?
			properties.additional_resources :
			undefined,
		media_file: properties.media?.file || undefined
	};

	// Remove undefined values to clean up the payload
	Object.keys(payload).forEach(key => {
		if (payload[key] === undefined) {
			delete payload[key];
		}
	});

	return payload;
}


/**
 * export function formatModulePayload(moduleData: any, courseId: string): FormData {
 *     // Extract the base property names (remove the module_1_ prefix)
 *     const properties: any = {};
 *     for (const key in moduleData) {
 *         if (key.startsWith('module_1_')) {
 *             const newKey = key.replace('module_1_', '');
 *             properties[newKey] = moduleData[key];
 *         }
 *     }
 *
 *     // Create a new FormData object
 *     const formData = new FormData();
 *
 *     // Append simple data to FormData
 *     formData.append('name', properties.title || ''); // Using title as name if not provided separately
 *     formData.append('course_id', courseId);
 *     formData.append('description', properties.description || '');
 *     formData.append('title', properties.title || '');
 *     formData.append('content', properties.body || '');
 *     formData.append('additional_resources', properties.additional_resources || '');
 *
 *     // Append the media file, if it exists
 *     if (properties.media && properties.media.file) {
 *         formData.append('media_file', properties.media.file);
 *     }
 *
 *     return formData;
 * }
 */

