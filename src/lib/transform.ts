import fastq, { queueAsPromised } from "fastq";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";

import { asyncTask, ConvertFilesOpions } from "../types";
import { logger } from "./logger";

const requestQueue: queueAsPromised<any> = fastq.promise(PrepareFile, 1); //number of workers for the queue

async function PrepareFile(t: asyncTask): Promise<void> {

	logger.info(`${requestQueue.length()} items in queue`);

	if (!t.req.file) {
		logger.error("Prepare File", "->", "Empty file");

		return;
	}

	if (!t.req.file.mimetype) {
		logger.error("Prepare File", "->", "Empty mimetype");

		return;
	}

	if (!t.req.body.type) {
		logger.error("Prepare File", "->", "Empty type");

		return;
	}

	logger.info(
		"Processing file",
		":",
		t.req.file.originalname,
		"=>",
		`...${t.fileoptions.id.substring(30, t.fileoptions.id.length)}.${t.fileoptions.outputmime}`
	);

	await convertFile(t.req.file, `./${t.fileoptions.id}.${t.fileoptions.outputmime}`, t.fileoptions);
}

async function convertFile(
	inputFile: any,
	outputName: string,
	options: ConvertFilesOpions
): Promise<any> {
	return new Promise((resolve, reject) => {
		//We write the file on filesystem because ffmpeg doesn't support streams
		fs.writeFile(`./tmp/${options.id}`, inputFile.buffer, function (err) {
			if (err) {
				logger.error(err);

				reject(err);

				return;
			}
		});

		let totalTime: number;
		ffmpeg()
			.addInput(`./tmp/${options.id}`)
			// .inputFormat(options.originalmime.toString().substring(options.originalmime.indexOf("/") +1, options.originalmime.length))
			.size(`${options.width}x${options.height}`)
			.videoCodec("libx264")
			.saveToFile(outputName)
			.toFormat(options.outputmime)
			.on("end", (end) => {
				if (totalTime === undefined || Number.isNaN(totalTime)) {
					totalTime = 0;
				}
				logger.info(`File converted successfully: ${outputName} ${totalTime} seconds`);
				fs.unlink(`./tmp/${options.id}`, (err) => {
					if (err) {
						logger.error(err);

						reject(err);

						return;
					}
				});

				resolve(end);
			})
			.on("error", (err) => {
				logger.error(`Error converting file`, err);

				reject(err);
			})
			.on("codecData", (data) => {
				totalTime = parseInt(data.duration.replace(/:/g, ""));
			})
			.on("progress", (p) => {
				const time = parseInt(p.timemark.replace(/:/g, ""));
				let percent: number = (time / totalTime) * 100;
				if (percent < 0) {
					percent = 0;
				}
				logger.info(
					`Processing : ` +
						`...${outputName.substring(38, outputName.length)} - ${Number(percent).toFixed(2)} %`
				);
			})
	});
}

function cleanTempDir() {
	logger.info("Cleaning temp dir");
	fs.readdir("./tmp", (err, files) => {
		if (err) {
			logger.error(err);
		}

		for (const file of files) {
			fs.unlink(`./tmp/${file}`, (err) => {
				if (err) {
					throw err;
				}
			});
		}
	});
}

export { cleanTempDir, convertFile, requestQueue };