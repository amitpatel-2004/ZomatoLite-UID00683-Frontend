import type { ValueOf } from '@appTypes/common.types';
import { USER_ROLES } from '@pages/auth/constants/auth.constants';

export type UserRole = ValueOf<typeof USER_ROLES>;
