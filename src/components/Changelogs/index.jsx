import React, { useEffect, useState } from "react"

const Changelogs = (props) => {
  const { codename, branch } = props
  const [changelogs, setChangelogs] = useState()

  const fetchChangelogs = async () => {
    const url = `https://raw.githubusercontent.com/Evolution-X/OTA/refs/heads/${branch}/changelogs/${codename}.txt`
    try {
      const logs = await fetch(url)
      const data = await logs.text()
      return data
    } catch (error) {
      console.error(
        "Error fetching changelogs for device " + codename,
        error
      )
    }
  }

  useEffect(() => {
    const fetchResponse = async () => {
      const response = await fetchChangelogs()
      setChangelogs(response)
    }
    fetchResponse()
  }, [codename, branch])

  return (
    <div>
      {changelogs && (
        <pre className="text-wrap pt-5 text-[0.9rem] xl:text-lg">
          {changelogs}
        </pre>
      )}
    </div>
  )
}

export default Changelogs
