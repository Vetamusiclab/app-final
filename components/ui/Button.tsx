import React from 'react';
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' };
export default function Button({ className='', variant='primary', ...props }: Props){
  const base = 'btn ' + (variant==='primary' ? 'btn-primary' : 'hover:bg-neutral-100');
  return <button {...props} className={base + ' ' + className} />;
}
