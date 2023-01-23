import { defineEventHandler } from 'h3';
import github from '@/utils/github';
import { useRuntimeConfig } from '#imports';

export default defineEventHandler(async () => {
    const config = useRuntimeConfig();

    try {
        const data = await github.$fetch(
            `
        query($username:String!) {
            user(login: $username) {
                repositories(first: 100, isFork: false, ownerAffiliations: OWNER, orderBy: {direction: DESC, field: CREATED_AT}) {
                    totalCount
                    totalDiskUsage
                    nodes {
                        nameWithOwner
                        isPrivate
                        languages(first: 100, orderBy: {direction: DESC, field: SIZE}) {
                            totalCount
                            edges {
                                node {
                                    name
                                    color
                                }
                                size
                            }
                        }
                    }
                }
            }
        }`,
            { username: config.public.GITHUB_USERNAME },
        );
        return data;
    } catch (e) {
        return {
            error: 'Request Failed',
        };
    }
});
