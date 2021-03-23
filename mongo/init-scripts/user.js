db.createUser({
    user    : "backend",
    pwd     : "123",
    roles   : [
        {
            role : "readWrite",
            db   : "thestuffer"
        }
    ]
})