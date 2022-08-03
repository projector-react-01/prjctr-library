import { AuthView, AuthViewProps } from './AuthView';
import { ComposeFunction, connect } from '../connect';

type AuthService = {
    refreshToken: () => void;
};

export const createAuthState =
    (authService: AuthService): ComposeFunction<object, Pick<AuthViewProps, 'refreshToken'>> =>
    () => ({
        props: {
            refreshToken: authService.refreshToken
        },
        effects: []
    });

export const Auth = connect(AuthView, 'authState');
