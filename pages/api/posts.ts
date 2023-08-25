import { NextApiHandler } from "next";

const handler: NextApiHandler = (request, response) => {

    const { method } = request;

    switch(method) {
        case "GET": return response.json({ok: true});
        default: return response.status(404).send('Not Found');
    }
}

export default handler;