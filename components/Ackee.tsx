import { useRouter } from 'next/router';
import useAckee from 'use-ackee';

/**
 * Component which initializes Ackee tracking.
 */
const Ackee: React.FC<{ ackeeServerUrl: string; ackeeDomainId: string }> = ({
  ackeeServerUrl,
  ackeeDomainId,
}) => {
  const router = useRouter();
  useAckee(
    router.asPath,
    { server: ackeeServerUrl, domainId: ackeeDomainId },
    { detailed: false, ignoreLocalhost: true },
  );

  return null;
};

export default Ackee;
