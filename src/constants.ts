export const VAN_TYPES = ["simple", "luxury", "rugged"] as const;

export type VanType = (typeof VAN_TYPES)[number];
