import React, { ReactNode, useEffect } from 'react';

interface ICssVariablesManagerProps {
  variables: {
    [key: string]: string;
  };
  children: ReactNode;
}

export const CssVariablesProvider = ({
  children,
  variables,
}: ICssVariablesManagerProps) => {
  const root: React.RefObject<HTMLDivElement> = React.createRef();
  useEffect(() => {
    // Apply css variables to root element
    Object.keys(variables).forEach((key) => {
      if (root.current) {
        root.current.style.setProperty(key, variables[key]);
      }
    });
  }, [variables]);
  return <div ref={root}>{children}</div>;
};
