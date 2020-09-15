import {createLocalVue} from "@vue/test-utils";
import {BootstrapVue, IconsPlugin} from "bootstrap-vue";

export const localVue = createLocalVue();
localVue.use(BootstrapVue)
localVue.use(IconsPlugin)
