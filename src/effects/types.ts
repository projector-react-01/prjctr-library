import { Observable } from 'rxjs';

const effectType = Symbol('Effect');

export type Effect = {
    readonly type: typeof effectType;
    readonly effect: () => Observable<unknown>;
};

export function createEffect(effectFactory: () => Observable<unknown>): Effect {
    return {
        type: effectType,
        effect: effectFactory
    };
}
