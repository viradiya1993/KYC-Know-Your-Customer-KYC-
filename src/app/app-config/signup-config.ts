import { environment } from "../../environments/environment";
const { IMAGE_SLIDER1, IMAGE_SLIDER2, IMAGE_SLIDER3, IMAGE_SLIDER4 } = environment

export const loginConfig = {
  productLogo: 'A base 64 image',
  signupButtonText: "Sign up",
  social: ['FACEBOOK', 'GOOGLE', 'LINKEDIN'],
  carouselImages: [
    IMAGE_SLIDER1,
    IMAGE_SLIDER2,
    IMAGE_SLIDER3,
    IMAGE_SLIDER4
  ],
  carouselHeader: [
    { key: 'carouselHeader1' },
    { key: 'carouselHeader2' },
    { key: 'carouselHeader3' },
    { key: 'carouselHeader4' },
  ],
  carouselText: [
    { key: 'carouselText1' },
    { key: 'carouselText2' },
    { key: 'carouselText3' },
    { key: 'carouselText4' },
  ],
  fieldProperties: [
    {
      type: 'text',
      label: {
        key: 'loginConfigEmailAddressLabelKey',
        defaultValue: 'Email Address',
      },
      placeholder: {
        key: 'loginConfigEmailAddressPlaceholderKey',
        defaultValue: 'Enter Email Address',
      },
      aria: 'email',
      name: 'email',
      subtype: 'email',
      required: true,
      visibility: true,
      requiredMessage: {
        key: 'loginConfigEmailRequiredKey',
        defaultValue: 'Email is required',
      },
    },
    {
      type: 'text',
      label: {
        key: 'loginConfigPasswordLabelKey',
        defaultValue: 'Password',
      },
      placeholder: {
        key: 'loginConfigPasswordsPlaceholderKey',
        defaultValue: 'Enter Password',
      },
      aria: 'password',
      name: 'password',
      subtype: 'password',
      required: true,
      visibility: true,
    },
  ],
  loginButtonText: {
    key: 'signinText',
    defaultValue: 'Custom Sign In',
  },
};
