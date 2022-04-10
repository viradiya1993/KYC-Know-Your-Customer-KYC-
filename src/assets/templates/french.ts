import * as fr from './fr.json'

export default {
    metadata: {
        version: 1.0,
        langTag: 'fr',
        langFamily: 'French',
        langVariant: 'French',
        supportedLanguages: ['English', 'French'],
      },
      langText: {
        ...fr,
        newUserInquiry: 'Nouvel utilisateur?',
        signupLink: "S'inscrire",
        contactSupport: 'Contactez le support',
        rightReserved: 'Tous droits réservés © 2021 The Seamfix',
        privacyTerm: 'Intimité | termes',
        appName: 'Verified',
        organizationName: 'SEAMFIX',
        carouselHeader1: 'Vérifié - Tout nouveau et amélioré',
        carouselHeader2: 'Le saviez-vous...',
        carouselHeader3: 'Intégrations d\'API simples',
        carouselHeader4: '5 choses que Vérifié fait le mieux et le plus rapidement.',
        carouselText1:
          "Profitez du tout nouveau look et de la nouvelle convivialité de Vérifié avec tout en place pour vous permettre de commencer facilement à vérifier les identités en ligne.",
        carouselText2:
          "On estime dans le monde entier que depuis 2005, les victimes d'usurpation d'identité sont plus de 500 millions, avec un coût associé de plus de 200 milliards de dollars pour les entreprises du monde entier? Heureusement que nous avons vérifié! Source: GSMA",
        carouselText3:
          'Tout ce dont vous avez besoin pour commencer à renforcer la confiance, une identité à la fois.',
          carouselText4:'Identification, validation, vérification, contrôle qualité et authentification',
        signinText: 'Se connecter',
        signinLink: "S'identifier",
        loginConfigEmailAddressLabelKey: "Entrer l'adresse",
        loginConfigEmailAddressPlaceholderKey: "Entrer l'adresse e-mail",
        loginConfigEmailInvalidKey: "L'email n'est pas valide",
        loginConfigEmailRequiredKey: "L'email est requis",
        loginConfigEmailLengthKey:
          'Courriel trop court, doit être de 5 caractères et plus',
    
        loginConfigUsernameAddressLabelKey: "Nom d'utilisateur",
        loginConfigUsernameAddressPlaceholderKey:
          "Saisissez votre nom d'utilisateur",
        loginConfigUsernameInvalidKey: "Le nom d'utilisateur n'est pas valide",
        loginConfigUsernameRequiredKey: "Nom d'utilisateur est nécessaire",
        loginConfigUsernameLengthKey:
          "La longueur du nom d'utilisateur est trop courte, doit être de 2 caractères et plus",
        loginConfigPhoneAddressLabelKey: 'Numéro de téléphone',
        loginConfigPhoneAddressPlaceholderKey: 'Entrez le numéro de téléphone',
        loginConfigPhoneInvalidKey: "Le numéro de téléphone n'est pas valide",
        loginConfigPhoneRequiredKey: 'Numéro de téléphone est requis',
        loginConfigPhoneLengthKey:
          "Le numéro de téléphone n'est pas valide doit contenir 11 chiffres",
        loginConfigPhoneMaxLengthKey:
          'Numéro de téléphone trop court, doit être supérieur ou égal à 13 chiffres',
    
        loginConfigPasswordLabelKey: 'Mot de passe',
        loginConfigPasswordsPlaceholderKey: 'Entrer le mot de passe',
        loginConfigPasswordInvalidKey: 'Mot de passe non valide',
        loginConfigPasswordRequiredKey: 'Mot de passe requis',
        loginConfigPasswordLengthKey:
          'La longueur du mot de passe est trop courte, doit être de 5 caractères et plus, inclure un caractère spécial et un nombre',
        forgotPasswordConfigPhoneLabelKey: 'Numéro de téléphone',
        forgotPasswordConfigPhonePlaceholderKey: 'Entrez le numéro de téléphone',
        forgotPasswordConfigPhoneInvalidKey: 'Numéro de téléphone non valide',
        forgotPasswordConfigPhoneRequiredKey:
          'Votre numéro de téléphone est requis pour la réinitialisation du mot de passe',
        forgotPasswordConfigPhoneLengthKey:
          "Le numéro de téléphone n'est pas valide doit contenir 11 chiffres",
    
        forgotPasswordEmailAddressLabelKey: "Entrer l'adresse",
        forgotPasswordEmailAddressPlaceholderKey: "Entrer l'adresse e-mail",
        forgotPasswordEmailInvalidKey: "L'email n'est pas valide",
        forgotPasswordEmailRequiredKey: "L'email est requis",
        forgotPasswordEmailLengthKey:
          'Courriel trop court, doit être de 5 caractères et plus',
    
        regexAtleastOneDigit: 'Le mot de passe doit contenir au moins un chiffre',
        regexAtLeastOneLowercase:
          'Le mot de passe doit contenir au moins un minuscule',
        resetPasswordConfigPasswordLabelKey: 'Mot de passe',
        resetPasswordConfigPasswordPlaceholderKey: 'Entrer le mot de passe',
        resetPasswordConfigPasswordInvalidKey: 'Mot de passe non valide',
        resetPasswordConfigPasswordRequiredKey:
          'Le mot de passe est requis pour la réinitialisation du mot de passe',
        resetPasswordConfigPasswordLengthKey:
          "Le mot de passe n'est pas valide doit contenir 11 chiffres",
    
        resetPasswordFormSuccess: 'Le mot de passe a été changé avec succès',
        resetPasswordFormBackToSignIn: 'Retour pour vous connecter',
        resetPasswordFormHeader: 'réinitialiser le mot de passe',
        resetPasswordFormSetPasswordText: 'Définissez votre nouveau mot de passe',
        resetPasswordFormBtnText: 'réinitialiser le mot de passe',
        resetPasswordImageHeader: 'Le temps de changer',
        resetPasswordImageText: 'Créez un nouveau mot de passe pour votre compte.',
    
        forgetPasswordHeaderText: 'Mot de passe oublié',
        forgetPasswordEmailAddress:
          "Saisissez l'adresse e-mail associée à votre compte",
        forgetPasswordPhoneNumber:
          'Entrez le numéro de téléphone associé à votre compte',
        forgetPasswordAccount:
          "Entrez l'e-mail ou le numéro de téléphone associé à votre compte",
        forgetPasswordBtnText: 'réinitialiser le mot de passe',
        forgetPasswordImageHeader: 'Zut!',
        forgetPasswordImageText:
          'Mot de passe oublié? Réinitialisez-le rapidement en fournissant votre e-mail.',
    
        changePasswordFormHeader: 'Changer le mot de passe',
        changePasswordFormBtnText: 'Changer le mot de passe',
        changePasswordFormSetPasswordText:
          'Changer le mot de passe par défaut envoyé à votre email',
    
        resetLinkEmailHeader: 'Vérifiez votre boîte de réception',
        resetLinkPhoneHeader: 'Regarde tes messages',
        resetLinkEmailMessage:
          "Une réinitialisation du mot de passe a été envoyée à l'adresse e-mail ci-dessus. Veuillez cliquer sur le lien de réinitialisation du mot de passe dans l'e-mail pour définir un nouveau mot de passe",
        resetLinkPhoneMessage:
          'Une réinitialisation du mot de passe a été envoyée au numéro de téléphone ci-dessus. Veuillez cliquer sur le lien de réinitialisation du mot de passe dans le message pour définir un nouveau mot de passe',
        notYourEmail: 'Pas votre e-mail?',
        notYourPhoneNumber: 'pas votre numéro de téléphone',
        enterDifferentEmail: 'Entrez un autre courrier',
        enterDifferentPhoneNumber: 'Entrez un autre numéro de téléphone',
        needHelp: "Besoin d'aide?",
    
        successBannerMessage: 'le mot de passe est sécurisé et tout est réglé!',
        
        socialGoogleText: 'Connectez via Google',
      welcomeBack: 'Nous saluons le retour',
      signinToContinue: 'Connectez-vous pour continuer',
      // troubleSigninInquiry: 'difficultés à se connecter?',
      forgetText: 'Mot de passe oublié?',
      otpConfirmBtn: 'Confirmer OTP',
      otpHeader: 'Entrez OTP',
      otpHeaderTextInit: 'Nous avons envoyé un ',
      otpHeaderTextFinal: 'code de confirmation à',
      otpNotSeen: "N'a pas reçu l'OTP?",
      resendOtp: 'Envoyer à nouveau',
      emailIsRequired: 'Email is required',
      usernameIsRequired: 'Username is required',
      passwordIsRequired: 'Password is required',
      prefixIsRequired: 'is required',
      emailPatternMessage:
        'Only include characters a-z & A-Z, Numbers 0-9, Symbols fullstop (.) hyphen (-) and underscore(_) and characters not less than 2 before the @ in your email address',
      passwordPatternMessage:
        'Length of password should not be less than 6 characters. No space allowed',
      usernamePatternMessage:
        'Should only contain Alphabet, Numbers and dashes(-). No space allowed and at least 3 character',
      fillFieldWarning: 'Please fill out this field',
  
      createUserHeading: 'Invitez des utilisateurs à Seamfix',
      createUserHeadingText:
        'Invitez vos collègues à vous rejoindre sur The Base pour collaborer sur des projets',
      createUserCheckboxtext: 'Créer un autre',
      createUserBtnText: 'Inviter',
      createUserConfigTitleLabelKey: 'Titre',
      createUserConfigTitlePlaceholderKey: 'Titre',
      createUserConfigTitleOptionKey1: 'Monsieur',
      createUserConfigTitleOptionKey2: 'Madame',
      createUserConfigTitleOptionKey3: 'Mademoiselle',
      createUserConfigTitleRequiredKey: 'Le titre est requis',
      createUserConfigFirstNameLabelKey: 'Prénom',
      createUserConfigFirstNamePlaceholderKey: 'Prénom',
      createUserConfigFirstNameRegexKey: 'Prénom non valide',
      createUserConfigFirstNameRequiredKey: 'Le prénom est requis',
      createUserConfigFirstNameLengthKey:
        'Longueur du prénom trop courte, doit être de 2 caractères et plus',
      createUserConfigFirstNameLengthKey2:
        'Longueur du prénom trop courte, ne doit pas dépasser 50 caractères',
      createUserConfigLastNameLabelKey: 'Nom de famille',
      createUserConfigLastNamePlaceholderKey: 'Nom de famille',
      createUserConfigLastNameRegexKey: 'Nom de famille non valide',
      createUserConfigLastNameRequiredKey: 'Le nom est obligatoire',
      createUserConfigLastNameLengthKey:
        'La longueur du nom de famille est trop courte, doit être de 2 caractères et plus',
      createUserConfigLastNameLengthKey2:
        'La longueur du nom de famille est trop courte, ne doit pas dépasser 50 caractères',
      createUserConfigMiddleNameLabelKey: 'Deuxième nom',
      createUserConfigMiddleNamePlaceholderKey: 'Deuxième nom',
      createUserConfigMiddleNameRegexKey: 'Deuxième prénom non valide',
      createUserConfigMiddleNameRequiredKey: 'Le deuxième prénom est requis',
      createUserConfigMiddleNameLengthKey:
        'La longueur du deuxième prénom est trop courte, doit être de 2 caractères et plus',
      createUserConfigMiddleNameLengthKey2:
        'deuxième prénom longueur trop longue, ne doit pas dépasser 50 caractères',
      createUserConfigEmailLabelKey: 'Adresse électronique',
      createUserConfigEmailPlaceholderKey: 'Adresse électronique',
      createUserConfigEmailRegexKey: 'Adresse email non valide',
      createUserConfigEmailRequiredKey: 'Adresse e-mail est nécessaire',
      createUserConfigEmailLengthKey:
        "La longueur de l'adresse e-mail est trop courte, doit être de 5 caractères et plus",
      createUserConfigGenderLabelKey: 'Le genre',
      createUserConfigGenderPlaceholderKey: 'Le genre',
      createUserConfigGenderOptionKey1: 'Mâle',
      createUserConfigGenderOptionKey2: 'Femme',
      createUserConfigGenderOptionKey3: 'Ni',
      createUserConfigGenderRequiredKey: 'Le sexe est requis',
      createUserConfigPhoneLabelKey: 'Numéro de téléphone',
      createUserConfigPhonePlaceholderKey: 'Numéro de téléphone',
      createUserConfigPhoneRegexKey: 'Numéro de téléphone non valide',
      createUserConfigPhoneRequiredKey:
        'Votre numéro de téléphone est requis pour la réinitialisation du mot de passe',
      createUserConfigPhoneLengthKey:
        "Le numéro de téléphone n'est pas valide doit contenir 9 chiffres",
      createUserConfigPhoneLengthKey2:
        "Le numéro de téléphone n'est pas valide doit contenir 11 chiffres",
      createUserConfigDateOfBirthLabelKey: 'Date de naissance',
      createUserConfigDateOfBirthPlaceholderKey: 'Date de naissance',
      createUserConfigDateOfBirthRequiredKey:
        'La date de naissance est obligatoire',
      createUserConfigRoleLabelKey: 'Sélectionnez un rôle',
      createUserConfigRolePlaceholderKey: 'Sélectionnez un rôle',
      createUserConfigRoleOptionKey1: 'Administrateur',
      createUserConfigRoleOptionKey2: 'Agent',
      createUserConfigRoleRequiredKey: 'Le rôle est requis',
      createUserConfigMessageLabelKey: "Message d'invitation (Optioal)",
      createUserConfigMessagePlaceholderKey: "Message d'invitation (Optioal)",
      createUserConfigMessageRequiredKey: 'Un message est requis',
      header_label:"Commencer",
      header_desc:"Créez votre compte gratuit sur la base"
    }
}