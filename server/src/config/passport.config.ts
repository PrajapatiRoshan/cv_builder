import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import { config } from './app.config';
import { Request } from 'express';
import { NotFoundException } from '../utils/appError.util';
import { ProviderEnum } from '../enums/accounts-provides.enum';
import {
  findUserById,
  loginOrCreateAccountService,
  verifyUserService,
} from '../services/auth.service';
import { signJwtToken } from '../utils/jwt.util';
import { StrategyOptions, ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

interface JwtPayload {
  userId: string;
}

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET,
  audience: ['user'],
  algorithms: ['HS256'],
};

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: config.GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email'],
      passReqToCallback: true,
    },
    async (req: Request, accessToken, refreshToken, profile, done) => {
      try {
        const { email, sub: googleId, picture } = profile._json;
        console.log(profile, 'profile');
        console.log(googleId, 'googleId');

        if (!googleId) {
          throw new NotFoundException('Google ID (sub) is missing');
        }

        const { user } = await loginOrCreateAccountService({
          provider: ProviderEnum.GOOGLE,
          displayName: profile.displayName,
          providerId: googleId,
          picture: picture,
          email: email,
        });

        const jwt = signJwtToken({ userId: user._id });

        req.jwt = jwt;

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (email, password, done) => {
      try {
        const user = await verifyUserService({ email, password });

        return done(null, user);
      } catch (error: any) {
        return done(error, false, { message: error?.message });
      }
    }
  )
);

passport.use(
  new JwtStrategy(options, async (payload: JwtPayload, done) => {
    try {
      const user = await findUserById(payload.userId);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(null, false);
    }
  })
);

passport.serializeUser((user: any, done) => done(null, user));

passport.deserializeUser((user: any, done) => done(null, user));

export const passportAuthenticationJWT = passport.authenticate('jwt', { session: false });

