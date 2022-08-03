import React, { useEffect, useState } from 'react';
import { merge } from 'rxjs';
import { Effect } from './types';
import { useDIContainer } from '../di/DIContainerContext';

export const MountEffects: React.FC = () => {
    const container = useDIContainer();
    const [effects] = useState(() => container.resolve('Effects') as readonly Effect[]);

    useEffect(() => {
        const subscription = merge(effects.map(({ effect }) => effect())).subscribe();

        return () => subscription.unsubscribe();
    }, []);

    return null;
};
