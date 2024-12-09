import Mock from "mockjs";
export default {
  getMenu: (config) => {
    const { username, password } = JSON.parse(config.body);
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === "admin" && password === "123456") {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: "/home",
              name: "home",
              label: "首页",
              icon: "s-home",
              url: "Home.vue",
            },
            {
              path: "/club",
              name: "club",
              label: "成绩管理",
              icon: "video-play",
              url: "Club.vue",
            },
            {
              path: "/activity",
              name: "activity",
              label: "课程管理",
              icon: "coordinate",
              url: "Activity.vue",
            },
            {
              path: "/user",
              name: "user",
              label: "学生信息管理",
              icon: "user",
              url: "User.vue",
            }
          ],
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else if (username === "admin" && password === "654321") {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: "/home",
              name: "home",
              label: "首页",
              icon: "s-home",
              url: "Home.vue",
            },
            {
              path: "/activity",
              name: "activity",
              label: "成绩管理",
              icon: "coordinate",
              url: "Activity.vue",
            },
            {
              path: "/user",
              name: "user",
              label: "学生信息管理",
              icon: "user",
              url: "User.vue",
            },
          ],
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else {
      return {
        code: -999,
        data: {
          message: "密码错误",
        },
      };
    }
  },
};
