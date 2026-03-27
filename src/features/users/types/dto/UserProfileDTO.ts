import type { UserDomain } from "@/features/users/types/UserDomain";

export type UserProfileDTO = Omit<UserDomain, 'isFollowing'>