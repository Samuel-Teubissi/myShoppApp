module.exports = {
	important: true,
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./public/index.html"
	],
	experimental: {
		applyComplexClasses: true, // Active les @apply avec padding, margin, etc.
	},
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				app: {
					DEFAULT: '#5f43e8',
					'50': '#fcf5fe',
					'100': '#dfe4ff',
					'200': '#efd3fb',
					'300': '#c6cbff',
					'400': '#817ffa',
					'500': '#6e61f3',
					'600': '#5f43e8',
					'700': '#5135cd',
					'800': '#422ea5',
					'900': '#392d82',
					'950': '#221a4c',
				},
				'deg': {
					'light': 'color-mix(in srgb, #ce39b6 10%, #fff 90%)',
					'dark': 'color-mix(in srgb, #2c2129 60%, black 20%)'
				},
				'dark': {
					DEFAULT: "color-mix(in oklab, #ce39b6 10%, #272727 90%)",
					'div': "color-mix(in oklab, #ce39b6 60%, #272727 40%)",
				},
				'dark-app': {
					DEFAULT: '#1e0116',
					'50': '#eef0ff',
					'100': '#dfe3ff',
					'200': '#c6cbff',
					'300': '#a3a9fe',
					'400': '#827ffa',
					'500': '#6d60f4',
					'600': '#6043e8',
					'700': '#5235cd',
					'800': '#422ea5',
					'900': '#3a2d82',
					'950': '#281e57',
				},
				'app-h': '#422ea5',
				'app-f': 'rgb(63 43 61)',
				'bg-app': '#fffaff',
				'l-grad': 'linear-gradient(45deg, #df4881, #c430d7)',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	variants: {
		extend: {
			opacity: ['disabled'],
		}
	},
	plugins: [require("tailwindcss-animate")],
}
