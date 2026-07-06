import { MS_PER_MINUTE } from '@constants/app.constants';
import { STEPS_STATUS } from '@constants/style.constants';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import {
  ORDER_STATUS,
  ORDER_TRACKING_PATH_STATUSES,
  ORDER_TRACKING_STAGE_ETA_MINUTES,
  ORDER_TRACKING_STEP_TITLES,
  ORDER_TRACKING_TERMINAL_BRANCH_STATUSES,
} from '@pages/restaurants/constants/order.constants';
import type {
  Order,
  OrderTrackingInfo,
  OrderTrackingStep,
} from '@pages/restaurants/types/order.types';
import { formatClock } from '@utils/time';

/** Time left and message for the order's current stage. */
const getEtaState = (
  order: Order,
  now: number,
): Pick<OrderTrackingInfo, 'countdownText' | 'statusMessage'> => {
  if (order.status === ORDER_STATUS.DELIVERED) {
    return { countdownText: null, statusMessage: DISPLAY.TRACKING.DELIVERED };
  }
  if (order.status === ORDER_STATUS.REJECTED) {
    return { countdownText: null, statusMessage: DISPLAY.TRACKING.REJECTED };
  }
  if (order.status === ORDER_STATUS.CANCELLED) {
    return { countdownText: null, statusMessage: DISPLAY.TRACKING.CANCELLED };
  }

  const stageMinutes = ORDER_TRACKING_STAGE_ETA_MINUTES[order.status];
  if (stageMinutes === null) return { countdownText: null, statusMessage: '' };

  const elapsedMs = now - order._updatedAt;
  const remainingMs = stageMinutes * MS_PER_MINUTE - elapsedMs;

  if (remainingMs <= 0) {
    return { countdownText: null, statusMessage: DISPLAY.TRACKING.RUNNING_LATE };
  }

  return { countdownText: formatClock(remainingMs), statusMessage: '' };
};

export const getOrderTrackingInfo = (order: Order, now: number): OrderTrackingInfo => {
  const isTerminalBranch = ORDER_TRACKING_TERMINAL_BRANCH_STATUSES.includes(order.status);

  const pathStatuses = isTerminalBranch
    ? [ORDER_STATUS.PENDING, order.status]
    : ORDER_TRACKING_PATH_STATUSES;

  const steps: OrderTrackingStep[] = pathStatuses.map((status) => {
    return { title: ORDER_TRACKING_STEP_TITLES[status] };
  });

  const currentStepIndex = isTerminalBranch
    ? 1
    : ORDER_TRACKING_PATH_STATUSES.indexOf(order.status);

  const stepsStatus = isTerminalBranch
    ? STEPS_STATUS.ERROR
    : order.status === ORDER_STATUS.DELIVERED
      ? STEPS_STATUS.FINISH
      : STEPS_STATUS.PROCESS;

  return {
    steps,
    currentStepIndex,
    stepsStatus,
    ...getEtaState(order, now),
  };
};
