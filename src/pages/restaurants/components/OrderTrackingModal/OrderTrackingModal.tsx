import React from 'react';

import { Modal, Steps, Typography } from 'antd';

import { MODAL_WIDTHS, STEPS_DIRECTION, TITLE_LEVELS } from '@constants/style.constants';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';

import type { OrderTrackingModalProps } from './OrderTrackingModal.types';

const { Step } = Steps;
const { Text, Title } = Typography;

export const OrderTrackingModal = (props: OrderTrackingModalProps): React.JSX.Element => {
  const { countdownText, currentStepIndex, onClose, order, statusMessage, steps, stepsStatus } =
    props;

  return (
    <Modal
      className="order-tracking-modal"
      footer={null}
      onCancel={onClose}
      open
      title={
        <>
          <Title className="order-tracking-modal__id" level={TITLE_LEVELS.SUBHEADING}>
            {DISPLAY.LABELS.ORDER_ID} #{order._id.slice(-6)}
          </Title>
          <Text className="typography__caption typography--secondary">{order.restaurantName}</Text>
        </>
      }
      width={MODAL_WIDTHS.SLIM}
    >
      <Steps
        className="order-tracking-modal__steps"
        current={currentStepIndex}
        direction={STEPS_DIRECTION.VERTICAL}
        status={stepsStatus}
      >
        {steps.map((step) => {
          return <Step key={step.title} title={step.title} />;
        })}
      </Steps>

      <div className="order-tracking-modal__eta">
        {countdownText ? (
          <>
            <Text className="typography__caption typography--secondary">
              {DISPLAY.TRACKING.TIME_REMAINING_LABEL} {countdownText}
            </Text>{' '}
          </>
        ) : (
          <Text className="typography__body">{statusMessage}</Text>
        )}
      </div>
    </Modal>
  );
};
