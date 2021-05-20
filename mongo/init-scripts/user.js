db.createUser({
    user    : "stuff",
    pwd     : "YbF5T0pAl4nWSWYq",
    roles   : [
        {
            role : "readWrite",
            db   : "thestuffer"
        }
    ]
})

db.createUser({
    user    : "auth",
    pwd     : "EpBA7xcQ1EPzvqS6",
    roles   : [
        {
            role : "readWrite",
            db   : "thestuffer"
        }
    ]
})