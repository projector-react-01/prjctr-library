import { createContainer, InjectionMode } from 'awilix';

export const DIContainer = createContainer({
    injectionMode: InjectionMode.PROXY
});
