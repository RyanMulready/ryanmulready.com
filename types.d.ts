export type eventInterface = {
    count: number;
    duration: number;
    date: string;
    weekDay: number;
};
export interface fetchOptInterface {
    method: string;
    mode: string;
    headers: object;
}

export interface GithubResponse {
    data?: {
        user?: {
            contributionsCollection?: {
                contributionCalendar: {
                    weeks: contributionWeeks[];
                };
            };
        };
    };
    message?: string;
    statusMessage?: string;
    statusCode?: number;
}

export interface HTMLInputEvent extends Event {
    target: HTMLInputElement;
}

export type contributionDays = {
    color: string;
    contributionCount: number;
    date: string;
    weekday: number;
};

export type contributionWeeks = {
    contributionDays: contributionDays[];
};

export interface contributionResponse {
    data: {
        user: {
            contributionsCollection: {
                contributionCalendar: {
                    totalContributions: number;
                    weeks: contributionWeeks[];
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
        weeks: contributionWeeks[];
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

declare global {
    interface Date {
        getWeek: () => number;
    }
}
