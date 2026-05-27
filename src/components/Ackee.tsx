'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import useAckee from 'use-ackee';

const Ackee: React.FC<{ ackeeServerUrl: string; ackeeDomainId: string }> = ({
  ackeeServerUrl,
  ackeeDomainId,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const url = search ? `${pathname}?${search}` : pathname;
  useAckee(url, { server: ackeeServerUrl, domainId: ackeeDomainId }, { detailed: false });

  return null;
};

export default Ackee;
