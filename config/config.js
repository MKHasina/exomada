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
            "username": DBUSER,
            "password": MDP,
            "database": DBNAME,
            "host": HOSTNAME,
            "dialect": DB
        }
    }
}
