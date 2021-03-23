const getStuffByCategory = async (params) => {

    return [200, params];
}

const getStuffById = async (id) => {

    return [200, id];
}

exports.stgProcess = async (req) => {

    if (req.params.id) {
        return await getStuffById(req.params.id);
    } else {
        return await getStuffByCategory(req.query);
    }
}