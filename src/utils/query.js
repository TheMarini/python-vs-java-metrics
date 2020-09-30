module.exports = (cursor, language) => {
  const after = cursor ? `, after: "${cursor}"` : '';

  return `
  {
    search(type: REPOSITORY, query: "stars:>100 language:${language}", first: 5${after}) {
      repositoryCount
      pageInfo {
        endCursor
      }
      nodes {
        ... on Repository {
          nameWithOwner
          createdAt
          pushedAt
          stargazers {
            totalCount
          }
          mergedPullRequests: pullRequests(states: MERGED) {
            totalCount
          }
          releases {
            totalCount
          }
          primaryLanguage {
            name
          }
          closedIssues: issues(states: CLOSED) {
            totalCount
          }
          totalIssues: issues {
            totalCount
          }
        }
      }
    }
  }  
  `;
};
