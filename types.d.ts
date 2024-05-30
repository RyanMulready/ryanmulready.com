type colorIntefrace = {
    bg: string;
    text: string;
};

type eventInterface = {
    flatMap?: any;
    commits?: number;
    meetings?: number;
    duration?: number;
    color?: colorIntefrace;
    isBestCommit?: boolean;
    date: string;
    weekDay: Nullable<number>;
};
type yearsInterface = {
    [key: string]: eventInterface;
};
interface fetchOptInterface {
    method: string;
    mode: string;
    headers: object;
}

interface filtersInterface {
    view: string;
    lastYear: number;
    meetings: boolean;
    streaks: boolean;
    best: boolean;
}

interface GithubResponse {
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

interface HTMLInputEvent extends Event {
    target: HTMLInputElement;
}

type contributionDay = {
    color: string;
    contributionCount: number;
    date: string;
    weekday: number;
};

type contributionWeeks = {
    contributionDays: contributionDay[];
};

interface contributionResponse {
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

interface contributionsInterface {
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

interface languagesInterface {
    data: {
        user: {
            repositories: {
                nodes: repositoryNodes[];
            };
        };
    };
}
