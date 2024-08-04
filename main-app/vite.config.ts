import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Adjust based on your framework

export default defineConfig({
	plugins: [react()],
	root: "./", // Set the root directory if necessary
	build: {
		outDir: "dist", // Output directory for the build
		rollupOptions: {
			input: {
				main: "./main-app/index.html", // Make sure this points to your main-app entry
			},
		},
	},
});
