import Image from 'next/image'

// Simple shimmer placeholder for blur effect
const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f3f3f3" offset="20%" />
      <stop stop-color="#ecebeb" offset="50%" />
      <stop stop-color="#f3f3f3" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f3f3f3" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animateTransform xlink:href="#r" attributeName="transform" type="translate" values="-${w} 0; ${w} 0; -${w} 0" dur="1s" repeatCount="indefinite" />
</svg>`

const toBase64 = (str) => {
  if (typeof window === 'undefined') {
    return Buffer.from(str).toString('base64')
  }
  return window.btoa(str)
}

export default function CustomImage({
  src = "",
  alt = "",
  width = 100,
  height = 100,
  className = "",
  priority = false,
  ...props
}) {
  // Generate blur data URL
  const blurDataURL = `data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`

  // Handle empty or invalid src
  const imageSrc = src || '/empty.png'

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      placeholder="blur"
      blurDataURL={blurDataURL}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
      {...props}
    />
  )
}
