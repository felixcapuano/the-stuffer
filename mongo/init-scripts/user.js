db.createUser({
    user    : "stuff",
    pwd     : "123",
    roles   : [
        {
            role : "readWrite",
            db   : "thestuffer"
        }
    ]
})

db.createUser({
    user    : "auth",
    pwd     : "123",
    roles   : [
        {
            role : "readWrite",
            db   : "thestuffer"
        }
    ]
})