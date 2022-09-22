export interface fetchOptInterface {
    method: string;
    mode: string;
    headers: object;
}

export interface JSONResponse {
    data?: object;
    message?: string;
    statusMessage?: string;
    statusCode?: number;
}

type contributionDays = {
    color: string;
    contributionCount: number;
    date: string;
    weekday: number;
};

export interface contributionsInterface {
    data: {
        user: {
            contributionsCollection: {
                contributionCalendar: {
                    totalContributions: number;
                    weeks: contributionDays[];
                };
            };
        };
    };
}

type nodeEdges = {
    size: number;
    node: {
        name: string;
        color: string;
    };
};

type repositoryNodes = {
    isPrivate: boolean;
    nameWithOwner: string;
    languages: {
        edges: nodeEdges[];
        pageInfo: object;
        totalCount: number;
    };
};

export interface languagesInterface {
    data: {
        user: {
            repositories: {
                nodes: repositoryNodes[];
            };
        };
    };
}
