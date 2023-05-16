import { h } from "vue";

const petIcons = {
  component:  (props) => h('i', {class: `pet-icon-${props.icon}`})
};

export default petIcons;