import fs from "fs";

export const fileOperations = {
  sync: (filename: string, content: string) => {
    fs.writeFileSync(filename, content, "utf-8");
    console.log(`Sync: File ${filename} created successfully.`);
    const data = fs.readFileSync(filename, "utf-8");
    console.log(`Sync: Read file content: ${data}`);
    fs.appendFileSync(filename, "\nUpdated Content");
    console.log(`Sync: File ${filename} updated.`);
    fs.unlinkSync(filename);
    console.log(`Sync: File ${filename} deleted.`);
  },

  async: async (filename: string, content: string) => {
    await fs.promises.writeFile(filename, content, "utf-8");
    console.log(`Async: Created file ${filename}.`);
    const data = await fs.promises.readFile(filename, "utf-8");
    console.log(`Async: Read file content: ${data}`);
    await fs.promises.appendFile(filename, "\nUpdated Content");
    console.log(`Async: File ${filename} updated.`);
    await fs.promises.unlink(filename);
    console.log(`Async: File ${filename} deleted.`);
  },

  stream: (filename: string, content: string) => {
    const writeStream = fs.createWriteStream(filename);
    writeStream.write(content);
    writeStream.end();
    console.log(`Stream: File ${filename} created.`);

    writeStream.on("finish", () => {
      const readStream = fs.createReadStream(filename, "utf-8");
      readStream.on("data", (chunk) => console.log(`Stream: Read - ${chunk}`));
      readStream.on("end", () => {
        const appendStream = fs.createWriteStream(filename, { flags: "a" });
        appendStream.write("\nUpdated Content");
        appendStream.end();
        console.log(`Stream: File ${filename} updated.`);
        appendStream.on("finish", () => {
          fs.unlink(filename, () =>
            console.log(`Stream: File ${filename} deleted.`)
          );
        });
      });
    });
  },
};
