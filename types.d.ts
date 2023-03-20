export type eventInterface = {
    commits?: number;
    meetings?: number;
    duration?: number;
    color?: string;
    isBestCommit?: boolean;
    date: string;
    weekDay: Nullable<number>;
};
export type yearsInterface = {
    [key: string]: eventInterface;
};
export interface fetchOptInterface {
    method: string;
    mode: string;
    headers: object;
}

export interface filtersInterface {
    view: string;
    lastYear: number;
    meetings: boolean;
    streaks: boolean;
    best: boolean;
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

export type contributionDay = {
    color: string;
    contributionCount: number;
    date: string;
    weekday: number;
};

export type contributionWeeks = {
    contributionDays: contributionDay[];
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
