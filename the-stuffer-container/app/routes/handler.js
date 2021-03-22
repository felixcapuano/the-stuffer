
exports.handler = (process) => {
    return async (req, res) => {

        let data = {};
        switch (req.method) {
            case 'GET':
                data = req.query;
                break;
            default:
                data = req.body;
                break;
        }
        console.log(data);

        const [status, response] = await process(data)
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
