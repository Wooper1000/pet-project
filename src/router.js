import { createRouter, createWebHistory } from 'vue-router'
import LoginFormApp from "@/components/Login-Form-App";
import WelcomeScreenApp from "@/components/Welcome-Screen-App";
import RecoveryPasswordApp from "@/components/Recovery-Password-App";
import RecoveryPasswordEnterCodeApp from "@/components/Recovery-Password-Enter-Code-App";
import RecoveryChangePasswordApp from "@/components/Recovery-Change-Password-App";
import RegistrationApp from "@/components/Registration-App";
import UserInformationApp from "@/components/User-Information-App";
import UserProfileSettingsApp from "@/components/User-Profile-Settings-App";

const routes = [
    { path: '/', name: 'WelcomeScreen', component: WelcomeScreenApp },
    { path: '/login', name: 'Login', component: LoginFormApp },
    { path: '/registration', name: 'Registration', component: RegistrationApp },
    { path: '/recovery', name: 'Recovery', component: RecoveryPasswordApp },
    { path: '/recovery/enter-code', name: 'Recovery-Enter-Code', component: RecoveryPasswordEnterCodeApp },
    { path: '/recovery/change-password', name: 'Recovery-Change-Password', component: RecoveryChangePasswordApp },
    { path: '/profile/information', name: 'UserInformation', component: UserInformationApp },
    { path: '/profile/settings', name: 'User-Profile-Settings', component: UserProfileSettingsApp },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router