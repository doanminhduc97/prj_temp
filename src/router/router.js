import Dashboard from "../pages/Dashboard.vue";
import Social from "../pages/Social.vue";
import Media from "../pages/Media.vue";
import Snackbar from "../pages/Snackbar.vue";
import Chart from "../pages/Chart.vue";
import Mailbox from "../pages/Mailbox.vue";
import Calendar from "../pages/Calendar.vue";
import Login from "../pages/core/Login.vue";
import Error from "../pages/core/Error.vue";
import GroupsPage from "../pages/groups/GroupsPage";
import AddGroupPage from "../pages/groups/AddGroupPage";
import UsersPage from "../pages/users/UsersPage";
import Features from "../pages/features/Features";
import FeatureDetail from "../pages/features/FeatureDetail";
import AddUserPage from "../pages/users/AddUserPage";

export default [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      breadcrumb: [{ name: "dashboard" }]
    }
  },
  {
    path: "/mailbox",
    name: "Mailbox",
    component: Mailbox,
    meta: {
      breadcrumb: [
        { name: "dashboard", href: "Dashboard" },
        { name: "mailbox" }
      ]
    }
  },
  {
    path: "/snackbar",
    name: "Snackbar",
    component: Snackbar,
    meta: {
      breadcrumb: [
        { name: "dashboard", href: "Dashboard" },
        { name: "snackbar" }
      ]
    }
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar,
    meta: {
      breadcrumb: [
        { name: "dashboard", href: "Dashboard" },
        { name: "calendar" }
      ]
    }
  },
  {
    path: "/social",
    name: "Social",
    component: Social,
    meta: {
      breadcrumb: [{ name: "dashboard", href: "Dashboard" }, { name: "social" }]
    }
  },
  {
    path: "/media",
    name: "Media",
    component: Media,
    meta: {
      breadcrumb: [{ name: "dashboard", href: "Dashboard" }, { name: "media" }]
    }
  },
  {
    path: "/chart",
    name: "Chart",
    component: Chart,
    meta: {
      breadcrumb: [{ name: "dashboard", href: "Dashboard" }, { name: "charts" }]
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: "/error",
    name: "Error",
    component: Error,
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: "/groups",
    name: "Groups",
    component: GroupsPage,
    meta: {
      breadcrumb: [{ name: "dashboard", href: "Dashboard" }, { name: "groups" }]
    }
  },
  {
    path: "/addGroup",
    name: "AddGroup",
    component: AddGroupPage,
    meta: {
      breadcrumb: [{ name: "dashboard", href: "Dashboard" }, { name: "Add group" }]
    }
  },
  {
    path: "/updateGroup/:groupId",
    name: "UpdateGroup",
    component: AddGroupPage,
    meta: {
      breadcrumb: [{ name: "dashboard", href: "Dashboard" }, { name: "Update group" }]
    }
  },
  {
    path: "/users",
    name: "Users",
    component: UsersPage,
    meta: {
      breadcrumb: [{ name: "dashboard", href: "Dashboard" }, { name: "users" }]
    }
  },
  {
    path: "/addUser",
    name: "AddUser",
    component: AddUserPage,
    meta: {
      breadcrumb: [
        { name: "dashboard", href: "Dashboard" },
        { name: "addUser" }
      ]
    }
  },
  {
    path: "/updateUser/:userId",
    name: "UpdateUser",
    component: AddUserPage,
    meta: {
      breadcrumb: [
        { name: "dashboard", href: "Dashboard" },
        { name: "Update User" }
      ]
    }
  },
  {
    path: "/features",
    name: "Features",
    component: Features,
    meta: {
      breadcrumb: [
        { name: "dashboard", href: "Dashboard" },
        { name: "feature" }
      ]
    }
  },
  {
    path: "/feature/add",
    name: "AddFeature",
    component: FeatureDetail,
    meta: {
      breadcrumb: [
        { name: "dashboard", href: "Dashboard" },
        { name: "addFeature" }
      ]
    }
  },
  {
    path: "*",
    redirect: "/"
  }
];
