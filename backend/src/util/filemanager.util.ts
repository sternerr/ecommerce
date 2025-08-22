import multer, { type Multer } from "multer";
import path from "path";
import fs from "fs";

class FileManager {
	public upload: Multer;

	private storage: multer.StorageEngine;
	private destination: string = "./src/public/uploads/";

	constructor() {
		this.storage = multer.diskStorage({
			destination: (req, file, cb) => {
				cb(null, this.destination);
			},
			filename: (req, file, cb) => {
				const originalName = file.originalname.replaceAll(" ", "_");
				const ext = path.extname(originalName);
				const baseName = path.basename(originalName, ext);
				let finalName = originalName;
				let counter = 1;

				while (!req.route.methods.put && fs.existsSync(path.join(this.destination, finalName))) {
					finalName = `${baseName}_${counter}${ext}`;
					counter++;
				}

				cb(null, finalName);
			}
		});

		this.upload = multer({ storage: this.storage })
	}

	deleteFile(filename: string) {
		fs.unlinkSync(this.destination + filename)
	}
}

export default new FileManager();
