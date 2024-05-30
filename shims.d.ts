// shims.d.ts
declare global {
    interface Date {
        getWeek: () => number;
    }
}

export {};
