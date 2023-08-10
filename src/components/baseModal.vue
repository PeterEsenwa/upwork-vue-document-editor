<template>
  <headless-dialog
      :open="isOpen"
      v-bind="$attrs"
      @close="close"
  >
    <dialog-overlay
      class="dialog-overlay"
      @click="close"
    />
    <dialog-panel class="dialog-panel">
      <slot
          :close="close"
          name="closeBtn"
      >
        <button
            class="close-btn"
            @click="close"
        >
          <slot name="close">
            <img
                alt="close"
            />
          </slot>
        </button>
      </slot>

      <slot
          :close="close"
          name="content"
      >
        <slot name="header" />
        <slot name="body" />
        <slot name="footer" />
      </slot>
    </dialog-panel>
  </headless-dialog>
</template>

<script
    lang="ts"
    setup
>
import { Dialog as HeadlessDialog, DialogOverlay, DialogPanel } from '@headlessui/vue';
import {Ref, WritableComputedRef} from "vue";
import {useVModel} from "@vueuse/core";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['toggle-open'])
const isOpen: Ref<boolean> | WritableComputedRef<boolean> = useVModel(props, 'modelValue');

const toggle = (value?: boolean) => {
  if (value === undefined) {
    isOpen.value = !isOpen.value;
  } else {
    isOpen.value = value;
  }
};

const close = () => {
  emit('toggle-open');
};
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: black;
  opacity: 0.1;
}

.close-btn {
  position: absolute;
  top: 1em;
  right: 1em;
  width: min-content;
  height: min-content;
  fill: red;
}

.dialog-panel {
  display: flex;
  position: fixed;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: min-content;
  min-width: 25vw;
  height: min-content;
  min-height: 15vh;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  padding: 1em;
  border-radius: 0.5rem;
  background-color: white;
  box-shadow: 1px 2px 3px 4px rgba(20,20,20,0.2);
}
</style>
