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
            "dialect": "postgres"
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
            "port": ""
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
