import * as React from "react";
import {
  Polymorphic,
  usePolymorphicComponent,
} from "@leafygreen-ui/polymorphic";
import type {
  PolymorphicComponentType,
  PolymorphicAs,
} from "@leafygreen-ui/polymorphic";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { domElements } from "./domElements";

interface PolymorphicProps {
  children?: React.ReactNode;
}

export type StyledFunction = {
  (component: PolymorphicAs): <V>(
    ...cvaParameters: Parameters<typeof cva<V>>
  ) => PolymorphicComponentType<
    PolymorphicProps & VariantProps<ReturnType<typeof cva<V>>>,
    PolymorphicAs
  >;
};

export type Styled = StyledFunction & {
  [DefaultAs in keyof JSX.IntrinsicElements]: ReturnType<StyledFunction>;
};

type Accumulator = {
  props: Record<string, any>;
  variantProps: Record<string, any>;
};

export const styledFunction: StyledFunction = (component: PolymorphicAs) => {
  const cvaWrapper = <V,>(...cvaParameters: Parameters<typeof cva<V>>) => {
    const componentFunction = cva(...cvaParameters);

    const MyComponent = Polymorphic<
      PolymorphicProps & VariantProps<typeof componentFunction>
    >(({ as = component, children, ...rest }, forwardedRef) => {
      const Component = usePolymorphicComponent(as);

      const { variants } = cvaParameters[1] ?? {};

      if (!variants) {
        return (
          <Component
            {...rest}
            ref={forwardedRef}
            className={twMerge(componentFunction())}
          >
            {children}
          </Component>
        );
      }

      const { props, variantProps } = Object.entries(rest).reduce<Accumulator>(
        (accumulator, [key, value]) => {
          if (
            (variants && variants[key]) ||
            key === "className" ||
            key === "class"
          ) {
            accumulator.variantProps[key] = value;
          } else {
            accumulator.props[key] = value;
          }

          return accumulator;
        },
        { props: {}, variantProps: {} }
      );

      return (
        <Component
          {...props}
          ref={forwardedRef}
          className={twMerge(componentFunction(variantProps as any))}
        >
          {children}
        </Component>
      );
    });

    return MyComponent;
  };
  return cvaWrapper;
};

export const styled = styledFunction as Styled;
domElements.forEach((domElement) => {
  styled[domElement] = styled(domElement);
});
