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
					DEFAULT: '#ce39b6',
					'050': '#fef5fd',
					'100': '#fdeafc',
					'200': '#fbd3f8',
					'300': '#f7b0ef',
					'400': '#f181e2',
					'500': '#e451cf',
					'600': '#ce39b6',
					'700': '#a5268e',
					'800': '#872173',
					'900': '#6f205e',
					'950': '#49093b',
				},
				'dark': {
					DEFAULT: "color-mix(in oklab, #ce39b6 10%, #272727 90%)",
					'div': "color-mix(in oklab, #ce39b6 60%, #272727 40%)",
				},
				'dark-app': {
					DEFAULT: '#1e0116',
					'50': '#f7f7f8',
					'100': '#eeeef0',
					'200': '#d9d9de',
					'300': '#b8b9c1',
					'400': '#91939f',
					'500': '#737584',
					'600': '#5d5e6c',
					'700': '#4c4d58',
					'800': '#41414b',
					'900': '#393941',
					'950': '#18181b',
				},
				'app-h': '#83467e',
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
