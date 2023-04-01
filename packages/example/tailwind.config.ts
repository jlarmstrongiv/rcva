import { fontFamily } from "tailwindcss/defaultTheme";

import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["var(--font-inter)", ...fontFamily.sans],
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
