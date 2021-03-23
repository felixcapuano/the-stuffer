const { request } = require("express");

exports.handler = (process) => {
    return async (req, res) => {

        const [status, response] = await process(req);

        switch (status) {
            case 200:
                res.status(200).send(response);
                break;
            default:
                res.sendStatus(500);
        }
    };
}
