<template>
  <v-app class="px-2">
    <v-container class="container">
      <v-row class="d-flex justify-start mb-2">
        <v-icon @click="$router.go(-1)" icon="mdi-chevron-left"/>
      </v-row>
      <v-card border="false" flat>
        <v-row class="d-flex align-center">
          <v-col cols="8">
            <v-card-text class="text-h5 font-weight-bold pl-0 pb-1" :style="{ lineHeight: '28.8px' }">
              Иннокентий Пупырчатый
            </v-card-text>
            <v-card-text class="text-subtitle-2 pl-0 py-0" style="color:#908F8F">Пользователь</v-card-text>
            <v-card-text class="text-subtitle-2 pl-0 py-0" style="color:#908F8F">ID: 123456789</v-card-text>
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
        <v-chip variant="text" class="text-subtitle-1 text-decoration-underline pr-2">Персональные
        </v-chip>
		<v-chip variant="text" style="color:#908F8F" class="pl-1" @click="$router.push('/profile/notifications')">Уведомления</v-chip>
        <v-badge color="red" :content="21" floating/>
      </v-row>
      <v-row class="d-flex justify-center">
        <v-sheet width="100%"

                 class="mt-4"
                 style="border-radius: 28px">
           <v-card-text :class="index===0 ? 'px-3 pt-4 pb-2':'px-3 pt-1 pb-2'" v-for="(field,index) in fields" :key="field.key" :type="field.type">
            <v-row class="ma-0 pa-0">
              <v-col cols="12 pa-0">
                <div class="text-subtitle-2 font-weight-regular"  style="color:#908F8F">
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
                <v-icon @click="field.dialog.open = true">mdi-pencil-outline</v-icon>
              </v-col>
            </v-row>
            <v-divider v-if="++index!==fields.length"/>
          </v-card-text>
        </v-sheet>
      </v-row>
      <v-dialog v-model="fields[0].dialog.open">
        <v-card class="rounded-xl">
         
          <v-card-title class="text-center">
            <span class="text-h5" v-if="fields[0].dialog.data.step != 1">Ваша должность</span>
          </v-card-title>
          <v-card-text>
            <v-container>
            <v-row>
            <h1  class="text-center" v-if="fields[0].dialog.data.step == 1">Ваша должность изменена</h1>
          </v-row>
          <v-row>
          <v-text-field v-if="fields[0].dialog.data.step == 0" label="Текст" v-model="fields[0].dialog.data.position"></v-text-field>
        </v-row>
        <v-row>
            <v-btn color="primary" block  size="x-large" @click="fields[0].dialog.data.step == 1 ? (fields[1].dialog.data.step = 0,fields[0].dialog.open = false) : fields[0].dialog.data.step++">
            {{ fields[0].dialog.data.step === 0 ? 'Сохранить' : 'Продолжить' }}
          </v-btn>
        </v-row>
      </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="fields[1].dialog.open">
          <v-card height="250px" class="rounded-xl">
          <v-card-title class="text-center">
            <span class="text-h5" v-if="fields[1].dialog.data.step != 2">Ваш телефон</span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <div style="height: 55px; width: 100%;" v-if="fields[1].dialog.data.step != 2">
              <p class="mb-2" v-if="fields[1].dialog.data.step == 0">Введите Ваш актуальный номер. На него мы отправим код для подтверждения</p>
            <p class="mb-2" v-if="fields[1].dialog.data.step == 1">Введите код, отправленный на номер {{ fields[1].dialog.data.phone }}</p>
            
          </div>
          <div style="height: 168px; padding-top: 35px;" v-if="fields[1].dialog.data.step == 2">
            <h1  class="text-center">Ваш номер телефона изменен</h1>
          </div>
          </v-row>
          <v-row>
          <v-text-field v-if="fields[1].dialog.data.step == 0" label="Телефон" v-model="fields[1].dialog.data.phone"></v-text-field>
          <v-text-field v-if="fields[1].dialog.data.step == 1" label="Код" v-model="fields[1].dialog.data.code"></v-text-field>
        </v-row>
        <v-row>
            <v-btn color="primary" block  size="x-large" @click="fields[1].dialog.data.step == 2 ? (fields[1].dialog.data.step = 0,fields[1].dialog.open = false) : fields[1].dialog.data.step++">
            {{ fields[1].dialog.data.step === 0 ? 'Сохранить' : 'Продолжить' }}
          </v-btn>
        </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="fields[2].dialog.open">
        <v-card height="250px" class="rounded-xl">
          <v-card-title class="text-center">
            <span class="text-h5" v-if="fields[2].dialog.data.step != 2">Ваша почта</span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <div style="height: 55px; width: 100%;" v-if="fields[2].dialog.data.step != 2">
              <p class="mb-2" v-if="fields[2].dialog.data.step == 0">Введите Ваш актуальный e-mail. На него мы отправим код для подтверждения</p>
            <p class="mb-2" v-if="fields[2].dialog.data.step == 1">Введите код, отправленный на e-mail  {{ fields[2].dialog.data.phone }}</p>
            
          </div>
          <div style="height: 168px; padding-top: 35px;" v-if="fields[2].dialog.data.step == 2">
            <h1  class="text-center">Ваш e-mail изменен</h1>
          </div>
          </v-row>
          <v-row>
          <v-text-field v-if="fields[2].dialog.data.step == 0" label="Текст" v-model="fields[2].dialog.data.email"></v-text-field>
          <v-text-field v-if="fields[2].dialog.data.step == 1" label="Код" v-model="fields[2].dialog.data.code"></v-text-field>
        </v-row>
        <v-row>
            <v-btn color="primary" block  size="x-large" @click="fields[2].dialog.data.step == 2 ? (fields[2].dialog.data.step = 0,fields[2].dialog.open = false) : fields[2].dialog.data.step++">
            {{ fields[2].dialog.data.step === 0 ? 'Сохранить' : 'Продолжить' }}
          </v-btn>
        </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="fields[3].dialog.open">
        <v-card class="rounded-xl">
          <v-card-title class="text-center">
            <span class="text-h5" v-if="fields[3].dialog.data.step != 2">Ваш пароль</span>
          </v-card-title>
          <v-card-text>
            <v-container>
            <v-row>
              <p class="mb-2" v-if="fields[3].dialog.data.step == 0">Чтобы продолжить введите Ваш актуальный пароль</p>
              <p class="mb-2" v-if="fields[3].dialog.data.step == 1">Введите новый пароль</p>
              <h1 class="text-center mb-6" v-if="fields[3].dialog.data.step == 2">Ваш пароль изменен</h1>
          </v-row>
          <v-row v-if="fields[3].dialog.data.step == 0">
          <v-text-field  label="Пароль" v-model="fields[3].dialog.data.oldPassword" type="password"></v-text-field>
        </v-row>
          <v-row v-if="fields[3].dialog.data.step == 1">
            <v-text-field label="Пароль" v-model="fields[3].dialog.data.password1" type="password"></v-text-field>
          </v-row>
          <v-row v-if="fields[3].dialog.data.step == 1">
            <v-text-field label="Еще раз пароль" v-model="fields[3].dialog.data.password2" type="password"></v-text-field>
          </v-row>
        <v-row>
            <v-btn color="primary" block  size="x-large" @click="fields[3].dialog.data.step == 2 ? (fields[3].dialog.data.step = 0,fields[3].dialog.open = false) : fields[3].dialog.data.step++">
            {{ fields[3].dialog.data.step === 0 ? 'Сохранить' : 'Продолжить' }}
          </v-btn>
        </v-row>
      </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>

</template>

<script>
import * as rules from '../utils/validators'
import phoneEditor from "@/utils/phoneEditor";
export default {
  data() {
    return {
      form:null,
      rules:{...rules},
      fields: [
        { key: 'position', label: 'Должность', value: 'Мастер', type: 'text',editable:true,rules:rules.text, dialog: {open: false, data: {position: '',step:0}} },
        { key: 'phone', label: 'Телефон', value: '+79110144266', type: 'tel',editable:true,rules:rules.phone, dialog: {open: false, data: {phone: '', code: '',step:0}} },
        { key: 'email', label: 'Email', value: 'example@gmail.com', type: 'email',editable:true,rules:rules.email, dialog: {open: false, data: {email: '', code: '',step:0}} },
        { key: 'password', label: 'Пароль', value: 'Wooperloozer10', type: 'password',editable:true,rules:rules.password, dialog: {open: false, data: {oldPassword: '', password1: '',password2:'',step:0}} },
        { key: 'company', label: 'Компания', value: 'ООО "ОБИТ"', type: 'text',editable: false,rules:rules.text }
      ],
      modal: false,
      fieldToEdit: null,
      notificationsCount:20
    }
  },
  methods: {

    openModal(field) {
      if(field.key==='password'){
        this.$router.push('/recovery/change-password')
      }
      this.fieldToEdit = {...field};
      this.modal = true;
    },
    saveField() {
      const index = this.fields.findIndex(f => f.key === this.fieldToEdit.key);
      this.fields[index].value = this.fieldToEdit.value;
      this.modal = false;
    },
    onPhoneInput() {
      this.fieldToEdit.value = phoneEditor(this.fieldToEdit.value);
    },
  },

};
</script>

<style>
</style>