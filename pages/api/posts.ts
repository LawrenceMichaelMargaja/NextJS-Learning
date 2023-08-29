import { NextApiHandler } from "next";
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

/**
 * FS - The fs (File System) module in Node.js provides an API for interacting with the file system on the server. 
 */

const readPostsInfo = () => {
    const dirPathToRead = path.join(process.cwd(), "posts")
    const dirs =  fs.readdirSync(dirPathToRead);
    const data = dirs.map((fileName) => {
        const filePathToRead = path.join(process.cwd(), "posts/" + fileName);
        const fileContent = fs.readFileSync(filePathToRead, {encoding: 'utf-8'});
        return matter(fileContent).data;
    });

    return data;
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