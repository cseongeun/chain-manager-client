import Image from '@/components/ui/image';
import { StaticImageData } from 'next/image';
import Jazzicon from 'react-jazzicon';

type UserCardProps = {
  image?: string;
  name: string;
};

export default function UserCard({ image, name }: UserCardProps) {
  return (
    <div className="flex items-center rounded-lg bg-gray-100 p-5 dark:bg-light-dark">
      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border-3 border-white drop-shadow-main dark:border-gray-400">
        {image ? (
          <Image
            src={image}
            alt={name}
            className="rounded-full"
            placeholder="blur"
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <Jazzicon diameter={100} seed={parseInt(name)} />
        )}
      </div>
      <div className="ltr:pl-3 rtl:pr-3">
        <h3 className="text-sm font-medium  tracking-wide text-gray-900 dark:text-white">
          {name}
        </h3>
        <span className="mt-1 block text-xs text-gray-600 dark:text-gray-400">
          {/* Something */}
        </span>
      </div>
    </div>
  );
}
