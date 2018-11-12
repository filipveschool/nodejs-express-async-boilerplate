module.exports = {
  linkedin: {
    id: process.env.LINKEDIN_ID || '',
    secret: process.env.LINKEDIN_SECRET || '',
    redirect: process.env.LINKEDIN_REDIRECT_URL || '',
  },
  facebook: {
    id: process.env.FACEBOOK_ID || '',
    secret: process.env.FACEBOOK_SECRET || '',
    redirect: process.env.FACEBOOK_REDIRECT_URL || '',
  },
  instagram: {
    id: process.env.INSTAGRAM_ID || '',
    secret: process.env.INSTAGRAM_SECRET || '',
    redirect: process.env.INSTAGRAM_REDIRECT_URL || '',
  },
  github: {
    id: process.env.GITHUB_ID || '',
    secret: process.env.GITHUB_SECRET || '',
    redirect: process.env.GITHUB_REDIRECT_URL || '',
  },
  twitter: {
    id: process.env.TWITTER_ID || '',
    secret: process.env.TWITTER_SECRET || '',
    redirect: process.env.TWITTER_REDIRECT_URL || '',
  },
  google: {
    id: process.env.GOOGLE_ID || '',
    secret: process.env.GOOGLE_SECRET || '',
    redirect: process.env.GOOGLE_REDIRECT_URL || '',
  },
  foursquare: {
    id: process.env.FOURSQUARE_ID || '',
    secret: process.env.FOURSQUARE_SECRET || '',
    redirect: process.env.FOURSQUARE_REDIRECT_URL || '',
  },
  paypal: {
    id: process.env.PAYPAL_ID || '',
    secret: process.env.PAYPAL_SECRET || '',
    return: process.env.PAYPAL_RETURN_URL || '',
    cancel: process.env.PAYPAL_CANCEL_URL || '',
  },
  pinterest: {
    id: process.env.PINTEREST_ID || '',
    secret: process.env.PINTEREST_SECRET || '',
    redirect: process.env.PINTEREST_REDIRECT_URL || '',
  },
};
