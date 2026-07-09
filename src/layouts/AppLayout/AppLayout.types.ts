import type { MenuProps } from 'antd';

export type AppLayoutProps = React.PropsWithChildren;

export type MenuItem = Required<MenuProps>['items'][number];
