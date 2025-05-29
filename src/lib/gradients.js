const GRADIENT_PALETTE_COLORS = [
  [0, 96, 255],
  [221, 74, 255],
  [200, 50, 50],
  [180, 180, 50]
]

const generateRandomGradientString = () => {
  const getRandomColorFromPalette = () => {
    const [r, g, b] =
      GRADIENT_PALETTE_COLORS[
        Math.floor(Math.random() * GRADIENT_PALETTE_COLORS.length)
      ]
    const opacity = Math.random() * 0.4 + 0.2
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  const getRandomPosition = () => {
    return `${Math.floor(Math.random() * 100)}% ${Math.floor(Math.random() * 100)}%`
  }

  const numGradients = Math.floor(Math.random() * 3) + 3
  let gradients = []
  for (let i = 0; i < numGradients; i++) {
    gradients.push(
      `radial-gradient(circle at ${getRandomPosition()}, ${getRandomColorFromPalette()} 0%, rgba(0, 0, 0, 0) 35%)`
    )
  }
  return gradients.join(', ')
}

export const getGradientBackgroundStyles = () => ({
  backgroundColor: '#040214',
  backgroundImage: generateRandomGradientString(),
  backgroundBlendMode: 'hard-light'
})
