import { Icon, Icons } from '@common/Icon/Icon';

export function validateIcon(icon: string): icon is Icon {
  if (icon in Icons) return true;
  return false;
}
