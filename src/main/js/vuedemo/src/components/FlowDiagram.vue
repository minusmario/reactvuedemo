<template>
    <div id='bpmnModel'></div>
</template>

<script>
  export default {
    name: 'FlowDiagram',
    props: {
      flowData: Object,
    },
    watch: {
      'flowData': function (n) {
        if (n.elements)
          window.B_drawDiagram(n);
      },
    },
  };
</script>

<style scoped>

</style>