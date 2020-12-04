/*
 * @Author: chneY
 * @Date: 2020-07-27 10:35:53
 * @Last Modified by: chenY
 * @Last Modified time: 2020-07-27 10:40:26
 */

import {
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dialog,
  MessageBox,
  Message,
  Tree,
  Button,
  Card,
  Input
} from "element-ui";
import VCalendar from "../../static/v-calendar/lib/v-calendar.min";
import "../../static/v-calendar//lib/v-calendar.min.css";
export default Vue => {
  Vue.use(Button);
  Vue.use(Card);
  Vue.use(Input);
  Vue.use(Menu);
  Vue.use(Submenu);
  Vue.use(MenuItem);
  Vue.use(Dialog);
  Vue.use(MenuItemGroup);
  Vue.use(Tree);
  Vue.use(VCalendar);
  Vue.prototype.$message = Message;
};
