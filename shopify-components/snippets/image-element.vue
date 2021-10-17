<template>
    <!-- Back to baisc image -->
    <div v-if="templateVariables['back_to_basics']" 
        class="image-element__wrap"
        :style="(templateVariables['image_background_color']) + ';' + (templateVariables['height_style'])">
      
        <img :alt="templateVariables['alt']"
            :src="templateVariables['image'].src.replace(/(\.jpg|\.png)/g, '_2000x' + '$1')"
            :style="templateVariables['inline_style']"
            :class="templateVariables['additional_classes']">
    </div>

    <!-- Non lazy image -->
    <div v-else-if="templateVariables['lazyload'] == true" class="image-element__wrap"
        :data-calculate-aspect-ratio="templateVariables['data-calculate-aspect-ratio'] ? 'true' : 'false'"
        :style="
            templateVariables['image_background_color'] + ' ' +
            templateVariables['height_style'] + ' ' +
            (!(templateVariables['height_style'] == true || templateVariables['object_fit']) ? 'max-width:' + templateVariables['image'].width + 'px;' : '')"
        >
        <img :alt="templateVariables['alt']"
            :class="
                'lazyload' + ' ' + 
                'transition--' + templateVariables['settings'].image_loading_style + ' ' +
                templateVariables['additional_classes']"
            :src="templateVariables['image'].src.replace(/(\.jpg|\.png)/g, '_1600x' + '$1')"
            :height="templateVariables['image'].height"
            :width="templateVariables['image'].width"
            :srcset="templateVariables['srcset']"
            :style="(templateVariables['inline_style']) + ';' + (templateVariables['height_style'])"/>
      <noscript class="noscript">
          <img :class="templateVariables['additional_classes']" 
              :src="templateVariables['image'].src.replace(/(\.jpg|\.png)/g, '_2000x' + '$1')"
              :alt="templateVariables['alt']">
      </noscript>              
    </div>

    <!-- Back normal image -->
    <div v-else class="image-element__wrap"
        :data-calculate-aspect-ratio="templateVariables['data-calculate-aspect-ratio'] ? 'true' : 'false'"
        :style="
            templateVariables['image_background_color'] + ' ' +
            templateVariables['height_style'] + ' ' +
            (!(templateVariables['height_style'] == true || templateVariables['object_fit']) ? 'max-width:' + templateVariables['image'].width + 'px;' : '')"
        >
        <img :alt="templateVariables['alt']"
            :class="
                'lazyload' + ' ' + 
                'transition--' + templateVariables['settings'].image_loading_style + ' ' +
                templateVariables['additional_classes']"
            :src="templateVariables['low_quality_image'] ? templateVariables['low_quality_image'] : ''"
            :data-src="templateVariables['image'].src.replace(/(\.jpg|\.png)/g, '_1600x' + '$1')"
            data-sizes="auto"
            :data-srcset="templateVariables['srcset']"
            :data-aspectratio="templateVariables['image'].width / templateVariables['image'].height"
            :height="templateVariables['image'].height"
            :width="templateVariables['image'].width"
            srcset="data:image/svg+xml;utf8,<svg%20xmlns='http://www.w3.org/2000/svg'%20width='400px'%20height='400px'></svg>"
            :style="(templateVariables['inline_style']) + ';' + (templateVariables['height_style'])" />
      
      <noscript class="noscript">
          <img :class="templateVariables['additional_classes']" 
              :src="templateVariables['image'].src.replace(/(\.jpg|\.png)/g, '_2000x' + '$1')"
              :alt="templateVariables['alt']">
      </noscript>    
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

  methods: {
    parseTemplateVariables() {
      this.templateVariables['settings'] = this.themeObject.settings;
      
      for (const renderVar in this.renderVariables) {
        this.templateVariables[renderVar] = this.renderVariables[renderVar];
      }          
    },

    initCurrentScopeTemplateVariables() { 
        const img_src = this.templateVariables['image'].src;
        const src_set_sizes  = ['200x','400x','600x','800x','1000x','1200x','1400x','1600x','1800x','2000x','2500x','3000x','3500x','4000x','4500x','5000x'];
        
        this.templateVariables['src_set'] = src_set_sizes.reduce((srcset, current_size) => {
            return srcset + img_src.replace(/(\.jpg|\.png)/g, '_' + current_size + '$1') + ' ' + current_size.replace('x', 'w') + ',';
        }, '');

        if (this.templateVariables['image_crop'] == true ) {
            this.templateVariables['height_style'] = `max-height: ${this.templateVariables['max_height']}px;`
        } else if (this.templateVariables['object_fit'] == true) {
            this.templateVariables['height_style'] = `max-height: ${this.templateVariables['max_height']}px; width: calc(${this.templateVariables['image'].width} /  ${this.templateVariables['image'].height} * ${this.templateVariables['max_height']}px);`;
        } else {
            this.templateVariables['height_style'] = '';
        }

        if (this.templateVariables['settings'].image_loading_style == 'blur-up') {
            this.templateVariables['low_quality_image'] = img_src.replace(/(\.jpg|\.png)/g, '_50x' + '$1');
        } else if (this.templateVariables['settings'].image_loading_style == 'color') {
            const dominant_color_image = img_src.replace(/(\.jpg|\.png)/g, '_1x' + '$1');
            this.templateVariables['image_background_color'] = `background: url(${dominant_color_image});`;
        }       
    },
  },      
  
  created() {
    this.parseTemplateVariables();
    this.initCurrentScopeTemplateVariables();
  }
}
</script>