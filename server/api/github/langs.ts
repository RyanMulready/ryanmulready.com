import { defineEventHandler } from 'h3';
import github from '@/utils/github';

export default defineEventHandler(async () => {
    const data = await github.$fetch(
        `
        query($_login:String!)
        {
          user(login: $_login) {
            repositories(first: 100, isFork: false, ownerAffiliations: OWNER, orderBy: {direction: DESC, field: CREATED_AT}) {
              totalCount
              # still figuring out how pagination works
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              totalDiskUsage
              # the list of repositories
              nodes {
                nameWithOwner
                # private repo?
                isPrivate
                # here is the list of languages used in this repo
                languages(first: 100, orderBy: {direction: DESC, field: SIZE}) {
                  totalCount
                  # still figuring out how pagination works
                  pageInfo {
                    hasNextPage
                    hasPreviousPage
                  }
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
        }
        `,
        {
            _login: 'RyanMulready',
        },
    );
    return data;
});
