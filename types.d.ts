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

export interface HTMLInputEvent extends Event {
    target: HTMLInputElement;
}

type contributionDays = {
    color: string;
    contributionCount: number;
    date: string;
    weekday: number;
};

export interface contributionResponse {
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

export interface contributionsInterface {
    // Key is year as a string
    [key: string]: {
        totalContributions: number;
        // Weeks is an array of weeks in the year
        weeks: contributionDays[];
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
