"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserResponse } from "@/types/user.type"

export function ProfileHeader({ user }: { user: UserResponse }) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">

      <div className="flex items-center gap-5">

        <Avatar className="h-24 w-24 border">
          <AvatarImage src={user.image || ''} />
          <AvatarFallback>
            {user.name}
          </AvatarFallback>
        </Avatar>

        <div>

          <h2 className="text-2xl font-semibold">
            {user.name}
          </h2>

          <p className="text-muted-foreground">
            {user.role}
          </p>

          <p className="text-sm text-muted-foreground">
            {user.city}
            {user.country}
          </p>

        </div>

      </div>

    </div>
  )
}