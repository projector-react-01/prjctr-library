import { LibraryView, LibraryViewProps } from './libraryView';
import { Observable } from 'rxjs';
import { ComposeFunction, connect } from '../../connect';

export type Credentials = {
    readonly username: string;
    readonly password: string;
};

type AuthService = {
    readonly isAuthenticated$: Observable<boolean>;
    readonly login: (requestParams: Credentials) => boolean;
    readonly logout: () => void;
    readonly refreshToken: () => void;
};

export function createLibraryState(
    authService: AuthService
): ComposeFunction<object, LibraryViewProps> {
    return () => ({
        props: {
            isAuthenticated: [authService.isAuthenticated$, false],
            onLogin: authService.login,
            onLogout: authService.logout
        },
        effects: []
    });
}

export const Library = connect(LibraryView, 'libraryState');
