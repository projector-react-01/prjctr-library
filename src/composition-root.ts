import { createFilterParamsService } from './library/filter-params-service';
import { createFilterResultService } from './library/filter-result-service';
import { createFilterService } from './library/filter-service';
import { AuthService, createAuthService } from './auth/auth-service';
import { createAxiosHTTPService } from './api/api-service';
import { createLibraryState } from './pages/library/library';
import { asFunction, AwilixContainer } from 'awilix';
import { createAuthState } from './auth/Auth';
import { createSetAuthEffect } from './auth/set-auth-effect';

function registerEffects(container: AwilixContainer) {
    container.register({
        authEffect: asFunction((authService: AuthService) =>
            createSetAuthEffect(authService.refreshToken)
        )
    });
}

export function registerDependencies(container: AwilixContainer): void {
    registerEffects(container);

    container.register({
        filterParams: asFunction(() => createFilterParamsService()).singleton(),
        filterResult: asFunction(() => createFilterResultService()).singleton(),
        apiService: asFunction(() => createAxiosHTTPService()).singleton(),
        authService: asFunction(apiService => createAuthService(apiService)).singleton(),
        filterService: asFunction((filterParamsService, filterResultService, apiService) =>
            createFilterService(filterParamsService, filterResultService, apiService)
        ).singleton(),
        libraryState: asFunction(authService => createLibraryState(authService)).singleton(),
        authState: asFunction(authService => createAuthState(authService)).singleton(),
        effects: asFunction(() => []).singleton()
    });
}
