// components/shared/UserAvatar.tsx
'use client';

import Image from 'next/image';

type Props = { src?: string; name: string; size?: number };

export default function UserAvatar({ src = '/avatars/default.png', name, size = 40 }: Props) {
  return (
    <div style={{ width: size, height: size }} className="relative rounded-full overflow-hidden bg-gray-100">
      {/* next/image требует корректный src в /public */}
      <Image src={src} alt={name} fill style={{ objectFit: 'cover' }} />
    </div>
  );
}
