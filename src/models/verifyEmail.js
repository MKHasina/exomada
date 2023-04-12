module.exports = (emailKey) => {

    return corps = {
        body: {
            greeting: 'Bonjour',
            intro: 'Nous sommes ravis que vous ayez choisi de vous inscrire sur Exomada.netlify.app! Avant de pouvoir accéder à toutes les fonctionnalités de notre site, nous devons confirmer votre adresse email.',
            action: {
                instructions: 'Veuillez cliquer sur le bouton ci-dessous pour vérifier votre adresse email et activer votre compte:',
                button: {
                    color: '#22BC66', // Couleur du bouton
                    text: 'Vérifier mon adresse email', // Texte sur le bouton
                    link: 'https://exomada.netlify.app/#/1?confkey=' + emailKey, // Lien vers la vérification de l'e-mail généré dynamiquement
                },
            },
            outro: "Si vous avez des questions ou des problèmes, n'hésitez pas à nous contacter à l'adresse suivante : support@exomada.netlify.app. Nous sommes heureux de vous aider à tout moment.",
            signature: 'Cordialement',

        }

    };
}





