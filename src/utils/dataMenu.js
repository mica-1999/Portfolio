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
          name: "TimeLine",
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
          page: "/dashboard/projects",
        },
        {
          name: "Project 2",
          icon: "project2",
          page: "/project2",
        },
        {
          name: "Project 3",
          icon: "project3",
          page: "/project3",
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
          name: "Learning 1",
          icon: "learning1",
          page: "/learning1",
        },
        {
          name: "Learning 2",
          icon: "learning2",
          page: "/learning2",
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
      page: "/chat",
    },
    {
      name: "Calendar",
      icon: "calendar",
      page: "/calendar",
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
  

