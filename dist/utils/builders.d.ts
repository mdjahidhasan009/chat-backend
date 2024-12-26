import { FindMessageParams } from './types';
export declare const buildFindMessageParams: (params: FindMessageParams) => {
    id: number;
    author: {
        id: number;
    };
    conversation: {
        id: number;
    };
};
