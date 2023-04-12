module.exports = (emailKey, pseudo) => {

    return corps = {
        body: {
            greeting: 'Bonjour ' + pseudo,
            intro: 'Nous avons bien reçu votre demande de modification de mot de passe.',
            action: {
                instructions: 'Pour des raisons de sécurité, nous vous demandons de confirmer cette modification en cliquant sur le lien ci-dessous :',
                button: {
                    text: 'Modification de mot de passe',
                    link: 'https://exomada.netlify.app/#/1?modifkey=' + emailKey
                }
            },
            outro: 'Si vous n\'êtes pas à l\'origine de cette demande, veuillez ignorer cet e-mail. Si vous avez des questions ou des préoccupations, n\'hésitez pas à nous contacter.',
            signature: 'Cordialement',

        }
    };
}
