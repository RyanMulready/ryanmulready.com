import { defineEventHandler } from 'h3';

const url = 'https://api.github.com/graphql';
const token = process.env.GITHUB_API_TOKEN;

const $fetch = async (
    query,
    variables,
    options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    },
) => {
    const res = await fetch(url, {
        ...(<any>options),
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    if (!res.ok) throw new Error(await res.json());

    const body = await res.json();

    if (body.errors) throw new Error(JSON.stringify(body.errors));

    return body;
};

export default defineEventHandler(async () => {
    const data = await $fetch(
        `
        query GetUser($login: String!) {
          user(login: $login) {
            name
            avatarUrl
            bio
            isHireable
          }
        }
        `,
        {
            login: 'RyanMulready',
        },
    );
    return {
        ...data,
    };
});
