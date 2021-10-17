<template>
  <div :class="'heading-wrapper--' + templateVariables.context +
            ' heading-wrapper' +
            ' heading-wrapper--' + templateVariables.settings.heading_divider_style +
            ' one-whole column' +
            ' is-flex' +
            ' is-flex-column' +
            ' is-align-' + templateVariables.text_alignment +
            ' text-align-' + templateVariables.text_alignment"
  >
    <component :is="templateVariables.heading_tag" :class="templateVariables.context + '__title title'">
      <a v-if="templateVariables.url" :href="templateVariables.url">{{ templateVariables.title }}</a>
      <span v-else>{{ templateVariables.title }}</span>
    </component>
    <div v-if="templateVariables.settings.display_heading_divider" 
          :class="'heading-divider' +
                  ' heading-divider--' + templateVariables.settings.heading_divider_style"
    >              
    </div>    
  </div>
</template>


<script>
export default {
  data() {
    return {
      templateVariables: {},
    }  
  },

  props: [
    "themeObject",
    "renderVariables",
  ],
  
  created() {
    this.templateVariables['settings'] = this.themeObject.settings;

    for (const renderVar in this.renderVariables) {
      this.templateVariables[renderVar] = this.renderVariables[renderVar];
    }

    if (!this.templateVariables.text_alignment) {
      this.templateVariables.text_alignment = "center";
    }
  }
}
</script>