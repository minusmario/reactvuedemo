<template>
    <div class="home">
        <flow-diagram :flow-data='flowData' flow-id='diagram-1111'></flow-diagram>
    </div>
</template>

<script>
  import FlowDiagram from '../components/FlowDiagram';

  export default {
    name: 'home',
    components: {
      'flow-diagram': FlowDiagram,
    },
    data() {
      return {
        flowId: '111',
      };
    },
    methods: {
      init(flowId) {
        this.$store.dispatch('getFlowData', { flowId });
      },
    },
    computed: {
      flowData: {
        get: function () {
          return this.$store.state.flowData;
        },
      },
    },
    created() {
      this.init(this.flowId);
    },
  };
</script>
