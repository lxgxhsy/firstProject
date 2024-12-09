const MenuData = [
  {
    path: "/",
    name: "home",
    label: "首页",
    icon: "s-home",
    url: "Home/Home",
  },
  {
    path: "/club",
    name: "club",
    label: "入学信息管理",
    icon: "video-play",
    url: "ClubManage/ClubManage",
  },
  {
    path: "/activity",
    name: "activity",
    label: "课程管理",
    icon: "attract",
    url: "ActivityManage/ActivityManage",
  },
  {
    path: "/user",
    name: "user",
    label: "学生信息管理",
    icon: "user",
    url: "UserManage/UserManage",
  },
  {
    label: "审核",
    icon: "location",
    children: [
      {
        path: "/page1",
        name: "page1",
        label: "课程审核",
        icon: "setting",
        url: "Other/PageOne",
      },
      {
        path: "/page2",
        name: "page2",
        label: "社团审核",
        icon: "setting",
        url: "Other/PageTwo",
      },
    ],
  },
];

export default MenuData;
