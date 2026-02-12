const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/auth/google/callback',
            proxy: true,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user already exists
                let user = await User.findOne({ googleId: profile.id });

                if (user) {
                    return done(null, user);
                }

                // Check if user exists with same email
                const email = profile.emails?.[0]?.value;
                if (email) {
                    user = await User.findOne({ email });
                    if (user) {
                        // Link google account to existing user
                        user.googleId = profile.id;
                        // Avoid overwriting avatar if already present
                        if (!user.avatar) {
                            user.avatar = profile.photos?.[0]?.value;
                        }
                        await user.save();
                        return done(null, user);
                    }
                }

                // If not, create new user
                user = new User({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: email || '',
                    avatar: profile.photos?.[0]?.value || null,
                });

                await user.save();
                done(null, user);
            } catch (err) {
                console.error(err);
                done(err, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
