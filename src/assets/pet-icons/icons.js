import { h } from "vue";

const petIcons = {
  component:  (props) => h('i', {class: `pet-${props.icon}`})
};

export default petIcons;