<template>
    <div class="product-thumbnail">
        <span v-if="templateVariables['settings'].display_vendor" class="product-thumbnail__vendor">{{ templateVariables['product'].vendor }}</span>
    
        <a :href="templateVariables['product'].onlineStoreUrl" class="product-thumbnail__title">{{ templateVariables['product'].title }}</a>

        <span :class="'product-thumbnail__price price'  + ' ' +
            templateVariables['first_variant'].compareAtPrice > templateVariables['first_variant'].price ? 'sale' : ''">   
            <span v-if="templateVariables['first_variant'].available">
                <span v-if="templateVariables['first_variant'].price > 0" class="money">
                    <SnippetPriceElement
                      :theme-object="themeObject"
                      :render-variables="{
                            price: templateVariables['first_variant'].price,
                      }">
                    </SnippetPriceElement>
                </span>
                <span v-else>For free</span>
                <span v-if ="templateVariables['first_variant'].price < templateVariables['first_variant'].compareAtPrice" class="product-thumbnail__was-price was-price">
                  <span class="money">
                    <SnippetPriceElement
                      :theme-object="themeObject"
                      :render-variables="{
                            price: templateVariables['first_variant'].compareAtPrice,
                      }">
                    </SnippetPriceElement>                  
                  </span>
                </span>
            </span>
            <span v-else class="product-thumbnail__sold-out sold-out">Sold Out</span>        
        </span>
    </div>
</template>


<script>
import SnippetPriceElement from '../snippets/price-element.vue';

export default {
  components: {
    SnippetPriceElement,
  },

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
        this.templateVariables['first_variant'] = this.templateVariables['product'].variants[0];
    },
  },      
  
  created() {
    this.parseTemplateVariables();
    this.initCurrentScopeTemplateVariables();
  }
}
</script>