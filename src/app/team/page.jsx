import { fetchTeam, fetchMaintainers } from '../../lib/dataService'
import TeamClientContent from './_client/TeamClientContent'
import { SITE } from '../../constants'

export async function generateMetadata() {
  const title = 'Team Evolution X'
  const description = 'The founders, team, and maintainers behind Evolution X!'
  const teamUrl = `${SITE}/team`

  const isProduction = process.env.NODE_ENV === 'production'
  const ogImageUrl = `${SITE}/team.png`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: teamUrl,
      siteName: 'Evolution X',
      type: 'website',
      ...(isProduction && {
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630
          }
        ]
      })
    },
    twitter: {
      card: 'summary_large_image',
      site: '@evolutionxrom',
      creator: '@evolutionxrom',
      title,
      description,
      ...(isProduction && {
        image: ogImageUrl
      })
    }
  }
}

export default async function TeamPage() {
  const [teamData, maintainersData] = await Promise.all([
    fetchTeam(),
    fetchMaintainers()
  ])

  const founders = [
    { name: 'Joey Huab', role: 'Founder / Lead Developer', github: 'joeyhuab' },
    {
      name: 'Anierin Bliss',
      role: 'Co-Founder / Co-Developer',
      github: 'AnierinBliss'
    },
    {
      name: 'Akito Mizukito',
      role: 'Co-Founder / Project Manager',
      github: 'RealAkito'
    }
  ]

  const allFoundersGitHub = founders.map((f) => f.github.toLowerCase())
  const allTeamGitHub = teamData.map((t) => t.github.toLowerCase())

  const getDevices = (github) => {
    const lc = github.toLowerCase()
    const active = maintainersData.active_maintainers.find(
      (m) => m.github.toLowerCase() === lc
    )
    if (active) {
      const devices = active.currently_maintains.map(
        (d) => `${d.device} (${d.codename})`
      )
      return devices.join(', ')
    }
    const inactive = maintainersData.inactive_maintainers.find(
      (m) => m.github.toLowerCase() === lc
    )
    if (inactive) {
      return inactive.used_to_maintain
        .map((d) => `${d.device} (${d.codename})`)
        .join(', ')
    }
    return null
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Evolution X',
    url: `${SITE}/team`,
    foundingDate: '2019-03-03',
    member: [
      ...founders.map((person) => {
        const devices = getDevices(person.github)
        return {
          '@type': 'Person',
          name: person.name,
          jobTitle: devices
            ? `${person.role} / Device Maintainer`
            : person.role,
          sameAs: `https://github.com/${person.github}`,
          ...(devices && { description: devices })
        }
      }),
      ...teamData.map((person) => {
        const devices = getDevices(person.github)
        return {
          '@type': 'Person',
          name: person.name,
          jobTitle: devices
            ? `${person.role} / Device Maintainer`
            : person.role,
          sameAs: `https://github.com/${person.github}`,
          ...(devices && { description: devices })
        }
      }),
      ...maintainersData.active_maintainers
        .filter(
          (m) =>
            !allFoundersGitHub.includes(m.github.toLowerCase()) &&
            !allTeamGitHub.includes(m.github.toLowerCase())
        )
        .map((maintainer) => ({
          '@type': 'Person',
          name: maintainer.name,
          jobTitle: 'Device Maintainer',
          sameAs: `https://github.com/${maintainer.github}`,
          description: maintainer.currently_maintains
            .map((d) => `${d.device} (${d.codename})`)
            .join(', ')
        })),
      ...maintainersData.inactive_maintainers
        .filter(
          (m) =>
            !allFoundersGitHub.includes(m.github.toLowerCase()) &&
            !allTeamGitHub.includes(m.github.toLowerCase())
        )
        .map((maintainer) => ({
          '@type': 'Person',
          name: maintainer.name,
          jobTitle: 'Former Device Maintainer',
          sameAs: `https://github.com/${maintainer.github}`,
          description: `${maintainer.used_to_maintain
            .map((d) => `${d.device} (${d.codename})`)
            .join(', ')} (No longer maintains devices)`
        }))
    ]
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
      <TeamClientContent
        teamData={teamData}
        maintainersData={maintainersData}
      />
    </>
  )
}
