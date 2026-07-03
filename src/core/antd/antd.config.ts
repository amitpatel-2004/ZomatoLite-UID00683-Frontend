import { message } from 'antd';

import { MESSAGE_CONFIG } from '@constants/style.constants';

message.config({
  maxCount: MESSAGE_CONFIG.MAX_COUNT,
  duration: MESSAGE_CONFIG.DURATION,
});
