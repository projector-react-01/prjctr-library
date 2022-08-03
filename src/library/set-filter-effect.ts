import { createEffect } from '../effects/types';
import { Observable, switchMap } from 'rxjs';
import { RequestParams } from './filter-params-service';
import { FilterResult } from './filter-result-service';
import { APIService } from '../api/api-service';

type AuthEffect = {
    filterParamsState$: Observable<RequestParams>;
    setResult: (result: FilterResult) => void;
    apiService: APIService;
};

export function createSetFilterEffect({ filterParamsState$, setResult, apiService }: AuthEffect) {
    return createEffect(() => {
        return new Observable<void>(() => {
            filterParamsState$
                .pipe(
                    switchMap(requestParams =>
                        apiService.request<FilterResult, RequestParams>(
                            '/api/videos',
                            requestParams,
                            {
                                method: 'post'
                            }
                        )
                    )
                )
                .subscribe(res => setResult(res));
        });
    });
}
