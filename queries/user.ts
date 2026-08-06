import { getCurrentUser } from "@/http/api";

export const currentUserQuery = {
    queryKey:["me"],
    queryFn: getCurrentUser
}