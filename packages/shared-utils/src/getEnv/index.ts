export interface Environment {
  nodeEnv: string | undefined;

  isDev: () => boolean;

  isStaging: () => boolean;

  isProd: () => boolean;
  isUnknown: () => boolean;
}

export enum EnvType {
  Dev = 1,
  Staging = 1 << 1,
  Prod = 1 << 2
}

export const getEnv = (): Environment => {
  /**
   * node env
   */
  const nodeEnv = process.env.NODE_ENV;

  let runType = EnvType.Dev;
  if (nodeEnv === 'staging') {
    runType = EnvType.Staging;
  }
  if (nodeEnv === 'production') {
    runType = EnvType.Prod;
  }

  return {
    nodeEnv,
    isDev: () => (runType & EnvType.Dev) > 0,
    isStaging: () => (runType & EnvType.Staging) > 0,
    isProd: () => (runType & EnvType.Prod) > 0,
    isUnknown: () => !nodeEnv
  };
};
