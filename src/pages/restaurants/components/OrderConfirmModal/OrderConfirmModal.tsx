import React from 'react';

import { Modal, Typography } from 'antd';

import { MODAL_WIDTHS } from '@constants/style.constants';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';

import type { OrderConfirmModalProps } from './OrderConfirmModal.types';

import './OrderConfirmModal.scss';

const { Text } = Typography;

export const OrderConfirmModal = (props: OrderConfirmModalProps): React.JSX.Element => {
  const { currencySymbol, isSubmitting, items, onClose, onConfirm, open, pricingSummary } = props;

  return (
    <Modal
      confirmLoading={isSubmitting}
      okText={DISPLAY.ACTIONS.PLACE_ORDER}
      onCancel={onClose}
      onOk={onConfirm}
      open={open}
      title={DISPLAY.TITLES.ORDER_SUMMARY}
      width={MODAL_WIDTHS.NARROW}
    >
      <div className="order-confirm-modal__items">
        {items.map((item) => {
          return (
            <div className="order-confirm-modal__row" key={item.menuItemId}>
              <Text className="typography__body">
                {item.name} x {item.quantity}
              </Text>
              <Text className="typography__body">
                {currencySymbol}
                {(item.unitPrice * item.quantity).toFixed(2)}
              </Text>
            </div>
          );
        })}
      </div>

      <div className="order-confirm-modal__divider" />

      <div className="order-confirm-modal__row">
        <Text className="typography__body typography--secondary">{DISPLAY.LABELS.SUBTOTAL}</Text>
        <Text className="typography__body">
          {currencySymbol}
          {pricingSummary.subtotal.toFixed(2)}
        </Text>
      </div>

      <div className="order-confirm-modal__row">
        <Text className="typography__body typography--secondary">{DISPLAY.LABELS.BOOKING_FEE}</Text>
        <Text className="typography__body">
          {currencySymbol}
          {pricingSummary.bookingFee.toFixed(2)}
        </Text>
      </div>

      <div className="order-confirm-modal__row">
        <Text className="typography__label">{DISPLAY.LABELS.TOTAL}</Text>
        <Text className="typography__accent">
          {currencySymbol}
          {pricingSummary.total.toFixed(2)}
        </Text>
      </div>
    </Modal>
  );
};
