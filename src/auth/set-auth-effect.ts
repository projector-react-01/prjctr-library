import { Observable } from 'rxjs';
import { createEffect } from '../effects/types';

export function createSetAuthEffect(refreshToken: () => void) {
    return createEffect(() => new Observable<void>(() => refreshToken()));
}
