export const dataMenu = [
    {
      name: "Home",
      icon: "main",
      page: "/pages/dashboard",
      collapsed: false,
      hasSubMenu: false,
    },
    {
      name: "Management",
      icon: "management",
      page: "",
      collapsed: false,
      hasSubMenu: true,
      subMenu: [
        {
          name: "Users",
          icon: "users",
          page: "/pages/dashboard/management/user",
        },
        {
          name: "Projects",
          icon: "projects",
          page: "/pages/dashboard/management/project",
        },
        {
          name: "Timeline",
          icon: "timeline",
          page: "/pages/dashboard/management/timeline",
        },
      ],
    },
    {
      name: "Projects",
      icon: "projects",
      page: "",
      collapsed: false,
      hasSubMenu: true,
      subMenu: [
        {
          name: "Project 1",
          icon: "project1",
          page: "/pages/dashboard/management/project1",
        },
        {
          name: "Project 2",
          icon: "project2",
          page: "/pages/dashboard/management/project2",
        },
        {
          name: "Project 3",
          icon: "project3",
          page: "/pages/dashboard/management/project3",
        },
      ],
    },
    {
      name: "Learning",
      icon: "learning",
      page: "",
      collapsed: false,
      hasSubMenu: true,
      subMenu: [
        {
          name: "Hardware",
          icon: "hardware",
          page: "/pages/dashboard/management/hardware",
        },
        {
          name: "SoftWare",
          icon: "software",
          page: "/pages/dashboard/management/software",
        },
      ],
    },
];


export const menuPages = [
    {
      name: "Blog Site",
      icon: "blog",
      page: "/pages/blog",
    },
    {
      name: "Email",
      icon: "email",
      page: "/email",
    },
    {
      name: "Chat",
      icon: "chat",
      page: "/pages/dashboard/chat",
    },
    {
      name: "Calendar",
      icon: "calendar",
      page: "/pages/dashboard/calendar",
    },
    {
      name: "Music",
      icon: "music",
      page: "",
      hasSubMenu: true,
      subMenu: [
        {
          name: "Playlists",
          icon: "playlist",
          page: "/playlists",
        },
        {
          name: "Favorites Songs",
          icon: "favorites",
          page: "/favorites",
        },
      ],
    },
    {
      name: "Websites",
      icon: "useful-websites",
      page: "",
      hasSubMenu: true,
      subMenu: [
        {
          name: "Website 1",
          icon: "website1",
          page: "/website1",
        },
        {
          name: "Website 2",
          icon: "website2",
          page: "/website2",
        },
      ],
    },
];
export const configMenuItems = [
    {
      name: "Users",
      icon: "users",
      page: "/users",
    },
    {
      name: "Posts",
      icon: "posts",
      page: "/posts",
    },
    {
      name: "DashBoard",
      icon: "dashboard",
      page: "/dashboard",
    },
];
  

