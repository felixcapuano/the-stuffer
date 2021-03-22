
exports.handler = (process) => {
    return async (req, res) => {

        const body = req.body;

        const [status, response] = await process(body)
                    .catch(() => [ 500, {}]);


        switch (status) {
            case 200:
                res.status(200).send(response);
                break;
            default:
                res.sendStatus(500);
        }
    };
}
