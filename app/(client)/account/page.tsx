'use client'

import Container from "@/components/common/Container"
import { ProfileHeader } from "./_components/profile-header"
import { ProfileSection } from "./_components/profile-section"
import { useQuery } from "@tanstack/react-query"
import { currentUserQuery } from "@/queries/user"
import Loading from "@/app/loading"

export default function AccountPage() {

  const { data: user, isLoading } = useQuery(currentUserQuery)


  if (isLoading) return <Loading />

  return (
    <Container>
      <div className="space-y-6 py-8">

        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        <ProfileHeader user={user} />

        <ProfileSection
          title="Personal Information"
          fields={[
            { label: "Full Name", value: user.name },
            { label: "Email", value: user.email },
            { label: "Role", value: user.role },
            { label: "Phone", value: user.phone },
            { label: "City", value: user.city },
            { label: "Country", value: user.country },
          ]}
        />

      </div>
    </Container>
  )
}