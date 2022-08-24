import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { useIsDarkMode } from '@/hooks/use-is-dark-mode';
import HexlantLogo from '@/assets/images/hexlant-logo.png';

const Logo: React.FC<React.SVGAttributes<{}>> = (props) => {
  const isMounted = useIsMounted();
  const { isDarkMode } = useIsDarkMode();

  return (
    <AnchorLink
      href="/"
      className="flex w-28 outline-none sm:w-32 4xl:w-36"
      {...props}
    >
      <span className="relative flex overflow-hidden">
        {isMounted && <Image src={HexlantLogo} alt="" priority />}
      </span>
    </AnchorLink>
  );
};

export default Logo;
