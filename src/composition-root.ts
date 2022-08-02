import { createFilterParamsService } from './library/filter-params-service';
import { createFilterResultService } from './library/filter-result-service';
import { createAuthService } from './auth/auth-service';
import { createAxiosHTTPService } from './api/api-service';
import { createLibraryState } from './pages/library/library';
import { asFunction, AwilixContainer } from 'awilix';
import { createAuthState } from './auth/Auth';
import { createSetAuthEffect } from './auth/set-auth-effect';

function registerEffects(container: AwilixContainer) {
    container.register(
        'setAuthEffect',
        asFunction(({ authService }) => createSetAuthEffect(authService.refreshToken)).singleton()
    );
}

export function registerDependencies(container: AwilixContainer) {
    container.register('apiService', asFunction(() => createAxiosHTTPService()).singleton());
    container.register(
        'authService',
        asFunction(({ apiService }) => createAuthService(apiService)).singleton()
    );
    container.register(
        'authState',
        asFunction(([{ authService }]) => createAuthState(authService)).singleton()
    );
    container.register(
        'libraryState',
        asFunction(({ authService }) => createLibraryState(authService)).singleton()
    );
    container.register('filterParams', asFunction(() => createFilterParamsService()).singleton());
    container.register('filterResult', asFunction(() => createFilterResultService()).singleton());

    registerEffects(container);

    container.register('Effects', asFunction(deps => [deps.setAuthEffect]).singleton());
}
