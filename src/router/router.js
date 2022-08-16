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
import DetailUserPage from "../pages/users/DetailUserPage";
import Features from "../pages/features/Features";
import AddFeature from "../pages/features/AddFeature";
import FeatureDetail from "../pages/features/FeatureDetail";
import AddUserPage from "../pages/users/AddUserPage";
import CategoryPage from "../pages/categories/CategoryPage";
import AddCategoryPage from "../pages/categories/AddCategoryPage";
import ManageDocument from "../pages/manage_document/ManageDocument";
import AddDocumentPage from "../pages/manage_document/AddDocumentPage";
// import DetailUserPage from "../pages/users/DetailUserPage";
import DetailGroupPage from "../pages/groups/DetailGroupPage";
import ArticlePage from "../pages/article/ArticlePage";
import AddArticlePage from "../pages/article/AddArticlePage";

export default [{
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
        path: "/groups/:id",
        name: "Detail Group",
        component: DetailGroupPage,
        meta: {
            breadcrumb: [{ name: "dashboard", href: "Dashboard" }, { name: "detail group" }]
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
        path: "/users/:id",
        name: "DetailUser",
        component: DetailUserPage,
        meta: {
            breadcrumb: [{ name: "dashboard", href: "Dashboard" }, { name: "DetailUser" }]
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
        path: "/detailFeature/:featureId",
        name: "FeatureDetail",
        component: FeatureDetail,
        meta: {
            breadcrumb: [
                { name: "dashboard", href: "Dashboard" },
                { name: "addUser" }
            ]
        }
    },
    {
        path: "/feature/add",
        name: "AddFeature",
        component: AddFeature,
        meta: {
            breadcrumb: [
                { name: "dashboard", href: "Dashboard" },
                { name: "addFeature" }
            ]
        }
    },
    {
        path: "/updateFeature/:featureId",
        name: "UpdateFeature",
        component: AddFeature,
        meta: {
            breadcrumb: [
                { name: "dashboard", href: "Dashboard" },
                { name: "Update Feature" }
            ]
        }
    },
    {
        path: "/document",
        name: "Document",
        component: ManageDocument,
        meta: {
            breadcrumb: [
                { name: "dashboard", href: "Dashboard" },
                { name: "Document" }
            ]
        }
    },
    {
        path: "/document/add",
        name: "AddDocumentPage",
        component: AddDocumentPage,
        meta: {
            breadcrumb: [
                { name: "dashboard", href: "Dashboard" },
                { name: "Add Document" }
            ]
        }
    },
    {
        path: "/updateDocument/:id",
        name: "UpdateDocument",
        component: AddDocumentPage,
        meta: {
            breadcrumb: [
                { name: "dashboard", href: "Dashboard" },
                { name: "Update Document" }
            ]
        }
    },
    {
        path: "/categories",
        name: "Categories",
        component: CategoryPage,
        meta: {
            breadcrumb: [
                { name: "dashboard", href: "Dashboard" },
                { name: "Category Page" }
            ]
        }
    },
    {
        path: "/addCategory",
        name: "AddCategory",
        component: AddCategoryPage,
        meta: {
            breadcrumb: [
                { name: "dashboard", href: "Dashboard" },
                { name: "Add Category Page" }
            ]
        }
    },
    {
        path: "/updateCategory/:catId",
        name: "UpdateCategory",
        component: AddCategoryPage,
        meta: {
            breadcrumb: [
                { name: "dashboard", href: "Dashboard" },
                { name: "Add Category Page" }
            ]
        }
    },
    {
        path: "/article",
        name: "Article",
        component: ArticlePage,
        meta: {
            breadcrumb: [
                { name: "dashboard", href: "Dashboard" },
                { name: "Article Page" }
            ]
        }
    },
    {
        path: "/addArticle",
        name: "AddArticle",
        component: AddArticlePage,
        meta: {
            breadcrumb: [
                { name: "dashboard", href: "Dashboard" },
                { name: "Add Article Page" }
            ]
        }
    },
    {
        path: "/updateArticle/:id",
        name: "UpdateArticle",
        component: AddArticlePage,
        meta: {
            breadcrumb: [
                { name: "dashboard", href: "Dashboard" },
                { name: "Add Article Page" }
            ]
        }
    },
    {
        path: "*",
        redirect: "/"
    }
];