module.exports = {

    "development": {
        "server": {
            "_PORT": 3007
        },
        "db": {
            "username": "root",
            "password": null,
            "database": "chat_exomada_db",
            "host": "127.0.0.1",
            "dialect": "mariadb"
        }
    },
    "test": {
        "server": {
            "port": 3007
        },
        "db": {
            "username": "root",
            "password": null,
            "database": "chat_exomada_db",
            "host": "127.0.0.1",
            "dialect": "mariadb"
        }
    },
    "production": {
        "server": {
            "port": process.env.PORT,
            "password":process.env.EMAILPWD,
            "email":process.env.EMAIL
        },
        "db": {
            "username": process.env.DBUSER,
            "password": process.env.MDP,
            "database": process.env.DBNAME,
            "host": process.env.HOSTNAME,
            "dialect": process.env.DB
        }
    }
}
