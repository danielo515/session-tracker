import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  scroll?: boolean;
};

export default function Page({ children, className = '', scroll = false }: Props) {
  return (
    <div className={`${className} common-page ${scroll ? 'page-scroll' : ''}`}>{children}</div>
  );
}
