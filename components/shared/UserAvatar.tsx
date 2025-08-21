import Image from 'next/image'
export default function UserAvatar({ src='/avatars/default.png', size=40 }:{src?:string; size?:number}){
  return <Image src={src} alt="avatar" width={size} height={size} className="rounded-full border" />
}
