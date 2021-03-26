exports.updateFormatting = (res, req, next) => {
    console.log(res.body);
    //next();
    req.sendStatus(200);
}