import { fetchOptInterface, GithubResponse } from '@/types';
import { useRuntimeConfig } from '#imports';

const url = 'https://api.github.com/graphql';
const config = useRuntimeConfig();

const $fetch = async (
    query: string,
    variables: object,
    options: fetchOptInterface = {
        method: 'POST',
        mode: 'cors',
        headers: {
            Authorization: `Bearer ${config.API_TOKEN_GITHUB}`,
        },
    },
): Promise<GithubResponse> => {
    const res = await fetch(url, {
        ...(<any>options),
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    const body: GithubResponse = await res.json();

    if (!res.ok || body.statusMessage) throw new Error(body.statusMessage);

    return body;
};

export default {
    $fetch,
};
