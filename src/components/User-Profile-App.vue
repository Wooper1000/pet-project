<template>
  <v-app class="px-2">
    <v-container class="container">
      <v-row class="d-flex justify-start mb-2">
        <v-icon @click="$router.go(-1)" icon="mdi-chevron-left"/>
      </v-row>
      <v-card border="false" flat>
        <v-row class="d-flex align-center">
          <v-col cols="8">
            <v-card-text class="text-h5 font-weight-bold pl-0 " :style="{ lineHeight: '28.8px' }">
              Иннокентий Пупырчатый
            </v-card-text>
            <v-card-text class="text-subtitle-1 pl-0 py-0">Пользователь</v-card-text>
            <v-card-text class="text-subtitle-1 pl-0 py-0">ID: 123456789</v-card-text>
          </v-col>
          <v-col cols="4" class="align-self-center">
            <v-avatar
                image="https://sun9-36.userapi.com/impg/9EGAXV98mSehy5617zZTg5Xw176v7I0Yd4xpXw/Hhtf-62aVL8.jpg?size=2560x1701&quality=95&sign=e9084093657bd7ec3c472da12da7ca23&type=album"
                size="80">
            </v-avatar>
          </v-col>
        </v-row>
      </v-card>
      <v-divider/>
      <v-row class="align-self-center mt-6">
        <v-chip variant="text" class="text-subtitle-1 text-decoration-underline">Персональные данные
        </v-chip>
        <v-badge color="red" :content="21" floating>
          <v-icon icon="mdi-bell-outline"></v-icon>
        </v-badge>
      </v-row>
      <v-row class="d-flex justify-center">

        <v-sheet width="100%"
                 rounded
                 class="mt-4"
                 color="#EEEEEE"
                 style="border-radius: 28px">
          <v-card-text :class="index===0 ? 'px-3 pt-7 pb-2':'px-3 pt-1 pb-2'" v-for="(field,index) in fields" :key="field.key" :type="field.type">
            <v-row class="ma-0 pa-0">
              <v-col cols="12 pa-0">
                <div class="text-subtitle-2 font-weight-regular">
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
            <v-divider v-if="++index!==fields.length"/>
          </v-card-text>
          <v-dialog v-model="modal" persistent>
            <v-card>
              <v-card-title v-text="'Изменить ' + fieldToEdit.label.toLowerCase()"></v-card-title>
              <v-card-text>

                <v-text-field
                    clearable
                    autofocus
                    @keydown.enter="saveField"
                    v-model="fieldToEdit.value"
                    :label="fieldToEdit.label"
                    @input="fieldToEdit.key==='phone' ? onPhoneInput():null"

                >
                </v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="saveField">Сохранить</v-btn>
                <v-btn color="red-lighten-1" @click="modal=false">Отмена</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-sheet>
      </v-row>
      <v-bottom-navigation grow :elevation="16" class="mb-2">
        <v-btn rounded style="width: calc(100% / 3); background-color: rgba(190, 222, 245, 0.5)">
          <v-icon>mdi-magnify</v-icon>
          Поиск
        </v-btn>
        <v-btn rounded style="width: calc(100% / 3); background-color: rgba(43, 116, 185,0.5)">
          <v-icon>mdi-plus</v-icon>
          Создать задачу
        </v-btn>
        <v-btn rounded style="width: calc(100% / 3); background-color: rgba(190, 222, 245, 0.5)">
          <v-icon>mdi-dots-horizontal</v-icon>
          Настройки
        </v-btn>
      </v-bottom-navigation>

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
        { key: 'position', label: 'Должность', value: 'Мастер', type: 'text',editable:true,rules:rules.text },
        { key: 'phone', label: 'Телефон', value: '+79110144266', type: 'tel',editable:true,rules:rules.phone },
        { key: 'email', label: 'Email', value: 'example@gmail.com', type: 'email',editable:true,rules:rules.email },
        { key: 'password', label: 'Пароль', value: 'Wooperloozer10', type: 'password',editable:true,rules:rules.password },
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