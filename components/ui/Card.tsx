import React from 'react';
export function Card({className='', children}:{className?:string; children:React.ReactNode}){
  return <div className={'card p-4 '+className}>{children}</div>
}
export function CardHeader({children}:{children:React.ReactNode}){
  return <div className="mb-3 font-semibold">{children}</div>
}
export function CardContent({children}:{children:React.ReactNode}){
  return <div>{children}</div>
}
