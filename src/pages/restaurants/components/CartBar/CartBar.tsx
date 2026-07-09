import React from 'react';

import { Button, Popconfirm, Typography } from 'antd';

import { BUTTON_TYPES, POPCONFIRM_PLACEMENT } from '@constants/style.constants';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';

import type { CartBarProps } from './CartBar.types';

import './CartBar.scss';

const { Text } = Typography;

export const CartBar = (props: CartBarProps): React.JSX.Element => {
  const { currencySymbol, itemCount, onClearCart, onProceed, total } = props;

  return (
    <div className="cart-bar">
      <div className="cart-bar__info">
        <Text className="typography__label">
          {itemCount} {DISPLAY.LABELS.ITEMS_SELECTED}
        </Text>
        <Text className="typography__accent">{`${currencySymbol}${total.toFixed(2)}`}</Text>
      </div>

      <div className="cart-bar__actions">
        <Popconfirm
          cancelText={DISPLAY.POPCONFIRM.CANCEL_TEXT}
          okText={DISPLAY.POPCONFIRM.OK_TEXT}
          okType="danger"
          onConfirm={onClearCart}
          placement={POPCONFIRM_PLACEMENT.TOP_RIGHT}
          title={DISPLAY.POPCONFIRM.CLEAR_CART_TITLE()}
        >
          <Button type={BUTTON_TYPES.DEFAULT}>{DISPLAY.ACTIONS.CLEAR_CART}</Button>
        </Popconfirm>

        <Button onClick={onProceed} type={BUTTON_TYPES.PRIMARY}>
          {DISPLAY.ACTIONS.PROCEED_TO_ORDER}
        </Button>
      </div>
    </div>
  );
};
