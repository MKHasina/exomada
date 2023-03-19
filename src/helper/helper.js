exports.UniD = (cle, id_max) => {
    return cle + "/" + ((isNaN(parseInt(id_max)) ? 0 : parseInt(id_max)) + 1);
}
exports.CDroles = (roles) => {
    if (roles === 5000) {
        return 411;
    }
    if (roles === 2001) {
        return 71;
    }
    if (roles === 6666) {
        return 401;
    }
    {
        return 404;
    }


}
