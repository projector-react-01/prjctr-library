import { FC } from 'react';
import { DIContext } from './di/DIContainerContext';
import { registerDependencies } from './composition-root';
import { DIContainer } from './di/di-container';
import { MountEffects } from './effects/MountEffects';
import { Router } from './router/Router';

registerDependencies(DIContainer);

export const App: FC = () => (
    <DIContext.Provider value={DIContainer}>
        <MountEffects />
        <Router />
    </DIContext.Provider>
);
