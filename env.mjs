import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    FAMILY_TOKEN: z.string().min(1),
    DATA_TOKEN: z.string().min(1),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get typeerrors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_ACKEE_SERVER: z.string().url(),
    NEXT_PUBLIC_ACKEE_DOMAIN_ID: z.string().min(1),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get typeerrors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    FAMILY_TOKEN: process.env.FAMILY_TOKEN,
    DATA_TOKEN: process.env.DATA_TOKEN,
    NEXT_PUBLIC_ACKEE_SERVER: process.env.NEXT_PUBLIC_ACKEE_SERVER,
    NEXT_PUBLIC_ACKEE_DOMAIN_ID: process.env.NEXT_PUBLIC_ACKEE_DOMAIN_ID,
  },
});
