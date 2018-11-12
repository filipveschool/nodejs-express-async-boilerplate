module.exports = {
  database: {
    config: {
      useNewUrlParser: true,
      useCreateIndex: true,
    },
    url:
      process.env.DATABASE_URL ||
      'mongodb://localhost:27017/nodejsexpressasyncboilerplate',
    port: process.env.DATABASE_PORT || 27017,
    mongoose_debug: true,
    db_name: 'nodejsexpressasyncboilerplate',
    host: 'localhost',
  },
  passport: {
    secret: process.env.PASSPORTSECRET || 'secretpassport',
  },

  NODE_ENV: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWTSECRET || 'jwt secret',
  mail: {
    services: {
      gmail: {
        service: 'GMAIL',
        auth: {
          user: process.env.GMAIL_USERNAME,
          password: process.env.GMAIL_PASSWORD,
        },
      },
      mailgun: {
        service: 'MAILGUN',
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
      },
    },
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO_TEST,
    username: 'sendermailid',
    password: 'senderpassword',
    verifyEmailUrl: 'verifyEmail',
    resetEmailurl: 'reset',
  },
  server: {
    host: process.env.SERVER_HOST || 'localhost',
    port: process.env.PORT || 3000,
  },
  key: {
    privateKey: '37LvDsm4XvjYOh9Y',
    tokenExpiry: 30 * 1000 * 60, // 1 hour
  },
  roles: {
    superadmin: 'ROLE_SUPERADMIN',
    admin: 'ROLE_ADMIN',
    moderator: 'ROLE_MODERATOR',
    editor: 'ROLE_EDITOR',
    user: 'ROLE_USER',
    anonymous: 'ROLE_ANONYMOUS',
  },
  token: {
    access: {
      type: 'TOKEN_TYPE_ACCESS',
      secret: process.env.TOKEN_ACCESS_SECRET,
      expiresIn: process.env.TOKEN_ACCESS_EXP,
    },
    refresh: {
      type: 'TOKEN_TYPE_REFRESH',
      secret: process.env.TOKEN_REFRESH_SECRET,
      expiresIn: process.env.TOKEN_REFRESH_EXP,
    },
    resetPassword: {
      type: 'TOKEN_TYPE_RESET_PASSWORD',
      secret: process.env.TOKEN_RESET_PASSWORD_SECRET,
      expiresIn: process.env.TOKEN_RESET_PASSWORD_EXP,
    },
    emailConfirm: {
      type: 'TOKEN_TYPE_EMAIL_PASSWORD',
      secret: process.env.TOKEN_EMAIL_CONFIRM_SECRET,
      expiresIn: process.env.TOKEN_EMAIL_CONFIRM_EXP,
    },
  },
  session: {
    hour: 3600000,
    day: this.hour * 24,
    week: this.day * 7,
    secret: process.env.SESSION_SECRET || 'my big secret',
    name: 'sid', // Generic - don't leak information
    proxy: false, // Trust the reverse proxy for HTTPS/SSL
    resave: false, // forces session to be saved even when unmodified,
    saveUninitialized: false, // forces a session that is uninitialized to be saved to the store
    cookie: {
      httpOnly: true, // Reduce XSS attack vector
      secure: false, // Cookies via HTTPS/SSL
      maxAge: process.env.SESSION_MAX_AGE || this.week,
    },
  },
  throttleLoginAttempts: {
    forIp: 50,
    forUser: 5,
    expires: '20m',
  },
  logging: {

  }
};
