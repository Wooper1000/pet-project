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

const routes = [
    { path: '/', name: 'WelcomeScreen', component: WelcomeScreenApp },
    { path: '/login', name: 'Login', component: LoginFormApp },
    { path: '/registration', name: 'Registration', component: RegistrationApp },
    { path: '/recovery', name: 'Recovery', component: RecoveryPasswordApp },
    { path: '/recovery/enter-code', name: 'Recovery-Enter-Code', component: RecoveryPasswordEnterCodeApp },
    { path: '/recovery/change-password', name: 'Recovery-Change-Password', component: RecoveryChangePasswordApp },
    { path: '/profile/information', name: 'UserInformation', component: UserInformationApp },
    { path: '/profile/settings', name: 'User-Profile-Settings', component: UserProfileSettingsApp },
    { path: '/settings/language', name: 'User-Profile-Settings-Language', component: SettingsLanguageApp },
    { path: '/settings/info', name: 'User-Profile-Settings-Info', component: SettingsInfoApp },
    { path: '/settings/geo', name: 'User-Profile-Settings-Geo', component: SettingsGeoApp },
    { path: '/settings/geo/permissions', name: 'User-Profile-Settings-Geo-Permission', component: SettingsGeoPermissionsApp },
    { path: '/profile/notifications', name: 'User-Profile-Notifications', component: UserProfileNotificationsApp },
    { path: '/task-manager', name: 'Task-Manager', component: TaskManagerApp },
    { path: '/task-manager/tasks/:id', name: 'Task-Manager-Subtsks', component: TaskManagerSubtasksApp },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router