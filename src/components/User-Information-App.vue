<template>

    <v-container class="container">
      <v-row class="d-flex justify-start mb-2">
        <v-icon @click="$router.go(-1)" icon="mdi-chevron-left" />
      </v-row>
      <v-card border="false" flat>
        <v-row class="d-flex align-center">
          <v-col cols="8">
            <v-card-text class="text-h5 font-weight-bold pl-0 pb-1" :style="{ lineHeight: '28.8px' }">
              {{ this.fullname }}
            </v-card-text>
            <v-card-text class="text-subtitle-2 pl-0 py-0" style="color:#908F8F">{{ $t('user') }}</v-card-text>
            <v-card-text class="text-subtitle-2 pl-0 py-0" style="color:#908F8F">ID: {{ this.userid }}</v-card-text>
          </v-col>
          <v-col cols="4" class="align-self-center">
            <v-avatar
              image="https://sun9-36.userapi.com/impg/9EGAXV98mSehy5617zZTg5Xw176v7I0Yd4xpXw/Hhtf-62aVL8.jpg?size=2560x1701&quality=95&sign=e9084093657bd7ec3c472da12da7ca23&type=album"
              size="80">
            </v-avatar>
          </v-col>
        </v-row>
      </v-card>
      <v-row class="align-self-center mt-7">
        <v-chip variant="text" class="text-subtitle-1 text-decoration-underline pr-2">{{ $t('personal') }}
        </v-chip>
        <v-chip variant="text" style="color:#908F8F" class="pl-1"
          @click="$router.push('/profile/notifications')">{{ $t('notifications') }}</v-chip>
        <v-badge color="red" :content="21" floating />
      </v-row>
      <v-row class="d-flex justify-center">
        <v-sheet width="100%" class="mt-4" style="border-radius: 28px">
          <v-card-text :class="index === 0 ? 'px-3 pt-4 pb-2' : 'px-3 pt-1 pb-2'" v-for="(field, index) in fields"
            :key="field.key" :type="field.type">
            <v-row class="ma-0 pa-0">
              <v-col cols="12 pa-0">
                <div class="text-subtitle-2 font-weight-regular" style="color:#908F8F">
                  {{ field.label }}
                </div>
              </v-col>
            </v-row>
            <v-row align="center" class="ma-0 pa-0">
              <v-col cols="9 pa-0">
                <div class="text-subtitle-1">
                  {{ field.type === 'password' ? '••••••••' : field.value }}
                </div>
              </v-col>
              <v-col v-if="field.editable" cols="3" class="text-end pa-0">
                <v-icon @click="openModal(field)">mdi-pencil-outline</v-icon>
              </v-col>
            </v-row>
            <v-divider v-if="++index !== fields.length" />
          </v-card-text>
        </v-sheet>
      </v-row>
      <PositionEditorDialogApp ref="positionDialog"></PositionEditorDialogApp>
      <PhoneEditorDialogApp ref="phoneDialog"></PhoneEditorDialogApp>
      <EmailEditorDialogApp ref="emailDialog"></EmailEditorDialogApp>
      <PasswordEditorDialogApp ref="passwrodDialog"></PasswordEditorDialogApp>
    </v-container>
</template>

<script>
import api from '../api'
import * as rules from '../utils/validators'
import phoneEditor from "@/utils/phoneEditor"
import PositionEditorDialogApp from './dialogs/Position-Edit-Dialog-App'
import PhoneEditorDialogApp from './dialogs/Phone-Edit-Dialog-App'
import EmailEditorDialogApp from './dialogs/Email-Edit-Dialog-App'
import PasswordEditorDialogApp from './dialogs/Password-Edit-Dialog-App'

export default {
  data() {
    return {
      form: null,
      rules: { ...rules },
      fields: [
        { key: 'position', label: this.$t('position'), value: 'Мастер', type: 'text', editable: true, rules: rules.text, dialog: 'positionDialog' },
        { key: 'phone', label: this.$t('phone'), value: '+79110144266', type: 'tel', editable: true, rules: rules.phone, dialog: 'phoneDialog' },
        { key: 'email', label: 'Email', value: 'example@gmail.com', type: 'email', editable: true, rules: rules.email, dialog: 'emailDialog' },
        { key: 'password', label: this.$t('password'), value: 'Wooperloozer10', type: 'password', editable: true, rules: rules.password, dialog: 'passwrodDialog' },
        { key: 'company', label: this.$t('company'), value: 'ООО "ОБИТ"', type: 'text', editable: false, rules: rules.text }
      ],
      fieldToEdit: null,
      notificationsCount: 20,
      fullname: '',
      userid: ''
    }
  },
  created() {
    this.updateUser();    
  },
  methods: {
    async updateUser(){
      let user = await api.getUser();

      this.fields.forEach(_field => {
        _field.value = user[_field.key];
      });
      this.userid = user.userId;
      this.fullname = user.fullname;
    },
    openModal(field) {
      this.$refs[field.dialog].openDialog();
    },
    onPhoneInput() {
      this.fieldToEdit.value = phoneEditor(this.fieldToEdit.value);
    },
  },
  components: {
    PhoneEditorDialogApp,
    PositionEditorDialogApp,
    EmailEditorDialogApp,
    PasswordEditorDialogApp,
  }

};
</script>

<style></style>