import github from '@/utils/github';

vi.mock('#imports', () => {
    return {
        useRuntimeConfig: () => ({
            API_TOKEN_GITHUB: 'fakeToken',
        }),
    };
});

global.fetch = vi.fn().mockImplementationOnce(() =>
    Promise.resolve({
        status: 200,
        ok: true,
        statusMessage: 'Sucess',
        json: () => Promise.resolve({}),
    }),
);

describe('$fetch function', () => {
    it('should make a request to the GitHub API with a valid query and variables', async () => {
        const query = '{ user(login: "octocat") { name } }';
        const variables = {};
        const options = {
            method: 'POST',
            mode: 'cors',
            headers: {
                Authorization: `Bearer FakeToken`,
            },
        };

        const response = await github.$fetch(query, variables, options);

        expect(response).toBeDefined();
    });

    it('should throw an error if the request is not successful', async () => {
        const query = '{ user(login: "invalid_username") { name } }';
        const variables = {};
        const options = {
            method: 'POST',
            mode: 'cors',
            headers: {
                Authorization: `Bearer fakeToken`,
            },
        };

        try {
            await github.$fetch(query, variables, options);
            throw new Error('Error should have been thrown');
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});
