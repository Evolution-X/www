import React, { useEffect, useState } from "react"
import Markdown from "react-markdown"

const FlashingInstructions = (props) => {
  const { codename, branch } = props
  const [instructions, setInstructions] = useState()

  const fetchInstructions = async () => {
    const url = `https://raw.githubusercontent.com/Evolution-X/www_gitres/refs/heads/main/devices/instructions/${branch}/${codename}.md`
    try {
      const logs = await fetch(url)
      const data = await logs.text()
      return data
    } catch (error) {
      console.error(
        "Error fetching instructions for device " + codename,
        error
      )
    }
  }

  useEffect(() => {
    const fetchResponse = async () => {
      const response = await fetchInstructions()
      setInstructions(response)
    }
    fetchResponse()
  }, [codename, branch])

  return (
    <div>
      {instructions && (
        <pre>
          <Markdown className="text-wrap text-[0.9rem] xl:text-lg">
            {instructions}
          </Markdown>
        </pre>
      )}
    </div>
  )
}

export default FlashingInstructions
