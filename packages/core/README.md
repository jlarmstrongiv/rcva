# RCVA

**R**eact **C**lass **V**[ariance](https://www.youtube.com/watch?v=9ZcyoZlY0aU) **A**[uthority](https://www.youtube.com/watch?v=9ZcyoZlY0aU)

## Introduction

> Creating variants with the “traditional” CSS approach can become an arduous task; manually matching classes to props and manually adding types.

> `cva` aims to take those pain points away, allowing you to focus on the more fun aspects of UI development.

`rcva` makes `cva` _more fun_ for `react` by adding a `styled` api with `as` props support.

## Acknowledgements

- [**@leafygreen-ui/polymorphic**](https://www.npmjs.com/package/@leafygreen-ui/polymorphic) ([MongoDB](https://www.mongodb.com/))

  Shoutout to the MongoDB team for making a great polymorphic (`as` prop) package. Since I started with my own homegrown research and implementation, I have a special appreciation for your work on this particular problem.

- [**class-variance-authority**](https://cva.style/) ([Joe Bell](https://joebell.co.uk))

  This project originally started out with the intention of merging into the wonderful [`cva`](https://www.npmjs.com/package/class-variance-authority) library, but after some discussion with Joe Bell, we felt it was best to go down the route of a separate project.

## Installation

```
npm i rcva
```

### Peer Dependencies

- ✅ NPM 7 and higher automatically installs peer dependencies
- ✅ PNPM 7 and higher automatically installs peer dependencies
- ❌ Yarn will need a [separate](https://www.npmjs.com/package/install-peers) [package](https://www.npmjs.com/package/install-peerdeps) or you can manually install them into your project

```
class-variance-authority tailwind-merge @leafygreen-ui/polymorphic
```

Please note that [`rcva`](https://www.npmjs.com/package/rcva) uses:

- [`class-variance-authority`](https://www.npmjs.com/package/class-variance-authority)
- [`tailwind-merge`](https://www.npmjs.com/package/tailwind-merge)
- [`@leafygreen-ui/polymorphic`](https://www.npmjs.com/package/@leafygreen-ui/polymorphic)

While these packages are mainly used internally, you may build your own custom components for advanced use-cases. For that reason, they are listed as peer dependencies.

## Getting Started

```tsx
// components/Button/Button.tsx
import { styled } from "rcva";

// or use styled(Link)(…)
export const Button = styled.button(
  ["font-sans", "font-semibold", "border", "rounded", "inline-block"],
  {
    variants: {
      intent: {
        primary: [
          "bg-blue-500",
          "text-white",
          "border-transparent",
          "hover:bg-blue-600",
        ],
        secondary: [
          "bg-white",
          "text-gray-800",
          "border-gray-400",
          "hover:bg-gray-100",
        ],
      },
      size: {
        small: ["text-sm", "py-1", "px-2"],
        medium: ["text-base", "py-2", "px-4"],
      },
    },
    compoundVariants: [
      { intent: "primary", size: "medium", class: "uppercase" },
    ],
    defaultVariants: {
      intent: "primary",
      size: "medium",
    },
  }
);
```

```tsx
// app/page.tsx
import React from "react";
import Link from "next/link";
import { Button } from "../components";

export default function Home() {
  return (
    <Button as={Link} href="/" intent="primary">
      Click Me
    </Button>
  );
}
```

### Omissions

As `cva` does not yet offer a built-in method for Required Variants or Composing Components, neither do we.

If the workarounds below do not solve your use-case, you are better off writing your own react component from scratch.

#### Required Variants

If your wrapped component has required props, those props will still be required. However, variants will be removed from your props before the props are passed down to the wrapped component.

Good `defaultVariants` are always recommended, but not fool-proof. Remember that variants can always be explicitly unset with `null`, rather than a value you defined.

#### Composing Components

If you want to compose components, the `as` prop can combine two components together.

### Examples

An example using `rcva` with `next` and `storybook` can be found [here](https://github.com/jlarmstrongiv/blob/main/packages/example).
