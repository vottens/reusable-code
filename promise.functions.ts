import ExtendableError from 'es6-error';
import { isNil } from 'lodash';

export async function timeoutIdlePromise(promiseFactory: () => Promise<any>, maximumIdleTime: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
        let handle = setTimeout(() => {
            reject(new TimeoutError('Idle promise timeout.'));
        }, maximumIdleTime);

        const clearHandle = () => {
            if (handle) {
                clearTimeout(handle);
                handle = null;
            }
        };

        try {
            const result = await promiseFactory();
            clearHandle();
            resolve(result);
        } catch (error) {
            clearHandle();
            reject(error);
        }
    });
};

export class TimeoutIdlePromiseError extends ExtendableError {
    code: string;
}

export class TimeoutError extends TimeoutIdlePromiseError {
    override code = 'TIMEOUT_ERROR';
}

//#endregion
