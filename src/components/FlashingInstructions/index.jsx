import React, { useEffect, useState } from "react"
import Markdown from "react-markdown"
const FlashingInstructions = (props) => {
  const [instructions, setInstructions] = useState()

  const fetchInstructions = async () => {
    const codename = props.codename
    const url = `https://raw.githubusercontent.com/Evolution-X/www_gitres/refs/heads/udc/devices/instructions/${codename}.md`
    try {
      const logs = await fetch(url)
      const data = await logs.text()
      console.log(data)
      return data
    } catch (error) {
      console.error(
        "Error fetching instructions for device " + props.codename,
        error,
      )
    }
  }
  useEffect(() => {
    const fetchResponse = async () => {
      const response = await fetchInstructions()
      setInstructions(response)
      console.log(response)
    }
    fetchResponse()
  }, [])

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
