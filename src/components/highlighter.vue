<template>
  <div>
    <textarea data-testid="source-text" v-model="sourceText"/>
    <input data-testid="search-term" v-model="stringToMatch"/>
    <input type="checkbox" data-testid="case-sensitive" v-model="isCaseSensitive" :checked="isCaseSensitive"/>
    <div data-testid="result" v-html="highlightString()"></div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue"
  
export default defineComponent({
  setup () {
    const isCaseSensitive = ref(false)
    const sourceText = ref("")
    const stringToMatch = ref("")
    
    const highlightString = () => {
      if (!sourceText.value || !stringToMatch.value) return sourceText.value
      const regex = new RegExp(stringToMatch.value, isCaseSensitive.value ? 'g' : 'gi')
      const replaced = sourceText.value.replaceAll(regex, match => `<mark>${match}</mark>`)
      return replaced
    }
    
    return {
      isCaseSensitive,
      sourceText,
      stringToMatch,
      highlightString
    }
  }
})
</script>

<style>
</style>