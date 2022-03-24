import { graphql } from '@octokit/graphql';

interface FetchReposResponse {
  user: {
    pinnedItems: {
      nodes: {
        id: number;
        url: string;
        name: string;
        description: string;
        stargazerCount: number;
        primaryLanguage: {
          name: string;
        };
      }[];
    };
  };
}

export interface GitHubRepo {
  id: number;
  url: string;
  name: string;
  description: string;
  stargazerCount: number;
  primaryLanguage: string;
}

export async function fetchRepos(): Promise<GitHubRepo[]> {
  const res = await graphql<FetchReposResponse>(
    `
      {
        user(login: "justinlettau") {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                id
                url
                name
                description
                stargazerCount
                primaryLanguage {
                  name
                }
              }
            }
          }
        }
      }
    `,
    {
      headers: {
        authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    }
  );

  return res.user.pinnedItems.nodes.map((x) => ({
    id: x.id,
    url: x.url,
    name: x.name,
    description: x.description,
    stargazerCount: x.stargazerCount,
    primaryLanguage: x.primaryLanguage.name,
  }));
}
