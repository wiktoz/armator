import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1B262C',
        'secondary': '#0F4C75'
      },
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif']
      }
    }
  },
  plugins: [],
}
export default config
