const { anycliConfig } = require('@~/scripts/getConfig');
import { success, error } from '@/utils/message';

export const list = async () => {
  try {
    success('\n' + JSON.stringify(anycliConfig, null, 2));
  } catch (err) {
    error(err);
    process.exit(1);
  }
};
