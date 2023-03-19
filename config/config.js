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
            "port": process.env.PORT
        },
        "db": {
            "username": "root",
            "password": null,
            "database": "chat_exomada_db",
            "host": "127.0.0.1",
            "dialect": "mariadb"
        }
    }
}
