import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button, Drawer, Grid, Layout, Menu, message, Modal, Popover, Typography } from 'antd';

import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { APP_NAME, DEFAULT_CURRENCY } from '@constants/app.constants';
import { ROUTES } from '@constants/route.constants';
import {
  BUTTON_SHAPES,
  BUTTON_TYPES,
  POPOVER_PLACEMENT,
  SIDER_WIDTHS,
} from '@constants/style.constants';
import { MESSAGES } from '@pages/auth/constants/messages.constants';
import { useAuth } from '@pages/auth/hooks/useAuth';
import { ORDER_STATUS } from '@pages/restaurants/constants/order.constants';
import { useMyOrders } from '@pages/restaurants/hooks/useMyOrders';
import type { Order } from '@pages/restaurants/types/order.types';
import { getAuthUser } from '@redux/authStore';

import type { AppLayoutProps } from './AppLayout.types';
import { getNavItems, getSelectedKey } from './AppLayout.utils';

import './AppLayout.scss';

const { Content, Header, Sider } = Layout;
const { Text } = Typography;

export const AppLayout = (props: AppLayoutProps): React.JSX.Element => {
  const { children } = props;
  const user = useSelector(getAuthUser);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const screens = Grid.useBreakpoint();

  const isMobile = screens.md === false;

  const { orders } = useMyOrders();
  const pendingOrdersCount = orders.filter((order: Order) => {
    return order.status === ORDER_STATUS.PENDING;
  }).length;

  const navItems = user ? getNavItems(user.role, pendingOrdersCount) : [];

  const handleLogoutClick = () => {
    Modal.confirm({
      cancelText: MESSAGES.CONFIRM.LOGOUT_CANCEL,
      okText: MESSAGES.CONFIRM.LOGOUT_OK,
      okType: 'danger',
      onOk: async () => {
        try {
          await logout();
          navigate(ROUTES.AUTH.LOGIN);
        } catch {
          void message.error(MESSAGES.ERRORS.LOGOUT_FAILED);
        }
      },
      title: MESSAGES.CONFIRM.LOGOUT_TITLE,
    });
  };

  const profileContent = user ? (
    <div className="profile-card">
      <Text className="typography__heading">{user.displayName}</Text>
      <Text className="typography__caption typography--secondary">{user.role}</Text>
      <Text className="typography__caption typography--secondary">
        {user.currency?.symbol ?? DEFAULT_CURRENCY.symbol}
        {user.balance?.toFixed(2) ?? '0.00'}
      </Text>
      <div className="profile-card__divider" />
      <Button block danger onClick={handleLogoutClick} type={BUTTON_TYPES.LINK}>
        {MESSAGES.LABELS.LOGOUT}
      </Button>
    </div>
  ) : null;

  const navMenu = (
    <Menu
      className="app-layout__nav"
      items={navItems}
      mode="inline"
      onClick={(e) => {
        return void navigate(e.key);
      }}
      selectedKeys={[getSelectedKey(navItems, location)]}
    />
  );

  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <div className="app-header-start">
          <Button
            className="app-header-start__toggle typography--white"
            icon={drawerOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            onClick={() => {
              return setDrawerOpen((prev) => {
                return !prev;
              });
            }}
            type={BUTTON_TYPES.TEXT}
          />
          <Text
            className="typography__display typography--white app-header-start__brand"
            onClick={() => {
              return navigate(ROUTES.RESTAURANT.DASHBOARD);
            }}
          >
            {APP_NAME}
          </Text>
        </div>

        {user && (
          <div className="app-header-end">
            <Popover
              content={profileContent}
              overlayClassName="app-layout__popover"
              placement={POPOVER_PLACEMENT.BOTTOM_RIGHT}
              trigger="click"
            >
              <Button
                className="app-header-end__trigger"
                icon={<UserOutlined />}
                shape={BUTTON_SHAPES.ICON}
                type={BUTTON_TYPES.TEXT}
              />
            </Popover>
          </div>
        )}
      </Header>

      <Layout className="app-layout__inner">
        {isMobile && (
          <Drawer
            className="app-layout__drawer"
            closable={false}
            onClose={() => {
              return setDrawerOpen(false);
            }}
            open={drawerOpen}
            placement="left"
            width={SIDER_WIDTHS.DEFAULT}
          >
            {navMenu}
          </Drawer>
        )}

        {!isMobile && (
          <Sider className="app-layout__sider" width={SIDER_WIDTHS.DEFAULT} theme="light">
            {navMenu}
          </Sider>
        )}

        <Content className="app-layout__content">{children}</Content>
      </Layout>
    </Layout>
  );
};
