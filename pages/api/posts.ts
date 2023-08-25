import { NextApiHandler } from "next";
import fs from 'fs';
import path from "path";

const readPostsInfo = () => {
    /**
     * Path.join provides the exact path where we are running the project.
     * 
     * process.cwd() gives the directory where Next.js is being executed.
     * 
     * "cwd" means "current working directory"
     * 
     * fs.readdirSync reads the contents of the directory passed. 
     * 
     * It takes in two arguments, the first one is the path of the file to read.
     * 
     * The second one is an optional argument, but is used to pass in the encoding type. 
     * 
     * Basically we can make the data readable for humans using "{encoding: 'utf-8'}"
     */
    const dirPathToRead = path.join(process.cwd(), "posts")
    const dirs = fs.readdirSync(dirPathToRead);

    dirs.map((fileName, index) => {
        const filePathToRead = path.join(process.cwd(), "posts/" + fileName);
        const fileContent = fs.readFileSync(filePathToRead, {encoding: 'utf-8'});
        console.log("the fileContent === ", fileContent);
    })

    return "";
}

const handler: NextApiHandler = (request, response) => {

    const { method } = request;

    switch(method) {
        case "GET": {
            const data = readPostsInfo()
            return response.json({postInfo: data});
        }
        default: return response.status(404).send('Not Found');
    }
}

export default handler;