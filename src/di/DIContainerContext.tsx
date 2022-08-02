import { createContext, useContext } from 'react';
import { AwilixContainer } from 'awilix';

export const DIContext = createContext<AwilixContainer | undefined>(undefined);

export const useDIContainer = () => {
    const containerValue = useContext(DIContext);

    if (!containerValue) {
        throw new Error('Please, provide value with DIContainerProvider');
    }

    return containerValue;
};
