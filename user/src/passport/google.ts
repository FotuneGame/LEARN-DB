import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Profile } from 'passport';

interface GoogleProfile extends Profile {
  displayName: string;
  emails?: { value: string; verified: boolean }[];
}

export const googleStrategy = new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  callbackURL: `${process.env.URL_BASE_INGRESS}${process.env.GOOGLE_URL_CALLBACK}`,
  scope: ['profile', 'email'],
  passReqToCallback: true
},
async (req: any, accessToken: string, refreshToken: string, profile: GoogleProfile, done: Function) => {
  try {
    if (!profile.emails || !profile.emails[0]) {
      return done(new Error("No email provided by Google"));
    }

    const userData = {
      provider: 'google',
      id: profile.id,
      displayName: profile.displayName || '',
      email: profile.emails[0].value,
      profile
    };

    done(null, userData);
  } catch (err) {
    done(err);
  }
});