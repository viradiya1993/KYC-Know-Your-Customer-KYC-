export const forgotPasswordConfig = {
  fieldProperties: [
    {
      type: 'text',
      label: {
        key: 'forgotPasswordEmailAddressLabelKey',
        defaultValue: 'Email Address',
      },
      placeholder: {
        key: 'forgotPasswordEmailAddressPlaceholderKey',
        defaultValue: 'Enter Email Address',
      },
      aria: 'email',
      name: 'email',
      subtype: 'email',
      minLength: 5,
      maxLength: 50,
      required: true,
      visibility: true,
      regexExpression:
        '^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$',
      regexMessage: {
        key: 'forgotPasswordEmailInvalidKey',
        defaultValue: 'Email not valid',
      },
      requiredMessage: {
        key: 'forgotPasswordEmailRequiredKey',
        defaultValue: 'Email is required',
      },
      minimumLengthMessage: {
        key: 'forgotPasswordEmailLengthKey',
        defaultValue: 'Email length too short, must be 5 characters and above',
      },
    },
  ],
  countriesList: [
    {
      name: 'Nigeria',
      code: '+234',
      image: 'https://cdn.countryflags.com/thumbs/nigeria/flag-400.png',
    },
    {
      name: 'Nicaragua',
      code: '+505',
      image:
        'https://cdn.webshopapp.com/shops/94414/files/54694016/nicaragua-flag-icon-free-download.jpg',
    },
    {
      name: 'Niger',
      code: '+227',
      image:
        'https://cdn.webshopapp.com/shops/94414/files/52409396/flag-of-niger.jpg',
    },
    {
      name: 'USA',
      code: '+001',
      image:
        'https://img.pngio.com/us-flag-images-for-usa-flag-clip-art-clipart-clipartix-usa-flag-usa-flag-png-hd-820_458.png',
    },
  ],
};

export const resetPasswordConfig = {
  fieldProperties: [
    {
      type: 'text',
      label: {
        key: 'resetPasswordConfigPasswordLabelKey',
        defaultValue: 'Password',
      },
      placeholder: {
        key: 'resetPasswordConfigPasswordPlaceholderKey',
        defaultValue: 'Enter Password',
      },
      aria: 'password',
      name: 'password',
      subtype: 'password',
      minLength: 11,
      maxLength: 11,
      required: true,
      visibility: true,
      regexExpression: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$',
      regexMessage: {
        key: 'resetPasswordConfigPasswordInvalidKey',
        defaultValue: 'Password not valid',
      },
      requiredMessage: {
        key: 'resetPasswordConfigPasswordRequiredKey',
        defaultValue: 'Password is require for password reset',
      }
    },
  ],
};

export const passwordPolicies = [
  {
    regexExpression: '.*[0-9].*',
    regexMessage: {
      key: 'regexAtleastOneDigit',
      defaultValue: 'Password must contain at least one digit',
    },
  },
  {
    regexExpression: '.*[a-z].*',
    regexMessage: {
      key: 'regexAtLeastOneLowercase',
      defaultValue: 'Password must contain at least one lowercase',
    },
  },
];
