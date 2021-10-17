<template>
    <span v-if="this.templateVariables['settings'].currency_format == 'money_with_currency_format'">
        {{ templateVariables['price'] }} like this
    </span>
    <span v-else>
        ${{ templateVariables['price'] }}
    </span>
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

  methods: {
    parseTemplateVariables() {
      this.templateVariables['settings'] = this.themeObject.settings;
      
      for (const renderVar in this.renderVariables) {
        this.templateVariables[renderVar] = this.renderVariables[renderVar];
      }          
    },

    initCurrentScopeTemplateVariables() { 
    },
  },      
  
  created() {
    this.parseTemplateVariables();
    this.initCurrentScopeTemplateVariables();
  }
}
</script>