import { createRouter, createWebHistory } from 'vue-router'
import LoginFormApp from "@/components/Login-Form-App";
import WelcomeScreenApp from "@/components/Welcome-Screen-App";
import RecoveryPasswordApp from "@/components/Recovery-Password-App";
import RecoveryPasswordEnterCodeApp from "@/components/Recovery-Password-Enter-Code-App";
import RecoveryChangePasswordApp from "@/components/Recovery-Change-Password-App";
import RegistrationApp from "@/components/Registration-App";
import UserInformationApp from "@/components/User-Information-App";
import UserProfileSettingsApp from "@/components/User-Profile-Settings-App";
import SettingsLanguageApp from "@/components/Settings-Language-App";
import SettingsInfoApp from "@/components/Settings-Info-App";
import SettingsGeoApp from "@/components/Settings-Geo-App";
import SettingsGeoPermissionsApp from "@/components/Settings-Geo-Permissions-App";
import UserProfileNotificationsApp from "@/components/User-Profile-Notifications-App";
import TaskManagerApp from '@/components/Task-Manager-App';
import TaskManagerSubtasksApp from '@/components/Task-Manager-Subtasks-App';
import SubtaskEditApp from "@/components/Subtask-Edit-App";

const routes = [
    { path: '/', name: 'WelcomeScreen', component: WelcomeScreenApp },
    { path: '/login', name: 'Login', component: LoginFormApp },
    { path: '/registration', name: 'Registration', component: RegistrationApp },
    { path: '/recovery', name: 'Recovery', component: RecoveryPasswordApp },
    { path: '/recovery/enter-code', name: 'Recovery-Enter-Code', component: RecoveryPasswordEnterCodeApp },
    { path: '/recovery/change-password', name: 'Recovery-Change-Password', component: RecoveryChangePasswordApp },
    { path: '/profile/information', name: 'UserInformation', component: UserInformationApp, meta: { requiresAuth: true } },
    { path: '/profile/settings', name: 'User-Profile-Settings', component: UserProfileSettingsApp, meta: { requiresAuth: true } },
    { path: '/settings/language', name: 'User-Profile-Settings-Language', component: SettingsLanguageApp, meta: { requiresAuth: true } },
    { path: '/settings/info', name: 'User-Profile-Settings-Info', component: SettingsInfoApp, meta: { requiresAuth: true } },
    { path: '/settings/geo', name: 'User-Profile-Settings-Geo', component: SettingsGeoApp, meta: { requiresAuth: true } },
    { path: '/settings/geo/permissions', name: 'User-Profile-Settings-Geo-Permission', component: SettingsGeoPermissionsApp, meta: { requiresAuth: true } },
    { path: '/profile/notifications', name: 'User-Profile-Notifications', component: UserProfileNotificationsApp, meta: { requiresAuth: true } },
    { path: '/task-manager', name: 'Task-Manager', component: TaskManagerApp, meta: { requiresAuth: true } },
    { path: '/task-manager/tasks/:id', name: 'Task-Manager-Subtasks', component: TaskManagerSubtasksApp, meta: { requiresAuth: true } },
    { path: '/task-manager/tasks/:id/:subtaskId/edit', name: 'Subtask-Edit', component: SubtaskEditApp, meta: { requiresAuth: true } },
    { path: '/task-manager', name: 'Task-Manager', component: TaskManagerApp, meta: { requiresAuth: true } },
    { path: '/logout', redirect: '/login' }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token') !== null;
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    if (requiresAuth && !isAuthenticated) {
        // Если маршрут требует аутентификации, но пользователь не аутентифицирован,
        // редиректим на страницу логина
        next('/login');
    } else if (isAuthenticated && to.path === '/login') {
        // Если пользователь аутентифицирован и пытается перейти на страницу логина,
        // перенаправляем его на страницу задач
        next('/task-manager');
    } else {

        next();
    }
});

export default router;