<template>
    <div :id='flowId'></div>
</template>

<script>
  import Diagram from '../diagram/Diagram';

  export default {
    name: 'FlowDiagram',
    props: {
      flowData: Object,
      flowId: String,
    },
    watch: {
      'flowData': function (data) {
        if (data.elements) {
          const domId = '#' + this.flowId;
          if ((!data.elements || data.elements.length === 0) &&
            (!data.pools || data.pools.length === 0)) return;
          let INITIAL_CANVAS_WIDTH = data.diagramWidth;
          const modelType = 'runtime';
          if (modelType === 'design') {
            INITIAL_CANVAS_WIDTH += 20;
          } else {
            INITIAL_CANVAS_WIDTH += 30;
          }
          const INITIAL_CANVAS_HEIGHT = data.diagramHeight + 50;
          const canvasWidth = INITIAL_CANVAS_WIDTH;
          const canvasHeight = INITIAL_CANVAS_HEIGHT;
          const viewBoxWidth = INITIAL_CANVAS_WIDTH;
          const viewBoxHeight = INITIAL_CANVAS_HEIGHT;
          if (modelType === 'design') {
            const headerBarHeight = 170;
            let offsetY = 0;
            if ($(window).height() > (canvasHeight + headerBarHeight)) {
              offsetY = ($(window).height() - headerBarHeight - canvasHeight) / 2;
            }
            if (offsetY > 50) {
              offsetY = 50;
            }
            $(domId).css('marginTop', offsetY);
          }
          $(domId).width(INITIAL_CANVAS_WIDTH);
          $(domId).height(INITIAL_CANVAS_HEIGHT);
          const paper = Raphael(document.getElementById(this.flowId), canvasWidth,
            canvasHeight);
          paper.setViewBox(0, 0, viewBoxWidth, viewBoxHeight, false);
          paper.renderfix();
          const diagram = new Diagram(domId, paper);
          if (data.pools) {
            for (let i = 0; i < data.pools.length; i++) {
              const pool = data.pools[i];
              diagram._drawPool(pool);
            }
          }
          const modelElements = data.elements;
          for (let i = 0; i < modelElements.length; i++) {
            const element = modelElements[i];
            //try {
            const drawFunction = '_draw' + element.type;
            diagram[drawFunction](element);
            //} catch(err) {console.log(err);}
          }
          if (data.flows) {
            for (let i = 0; i < data.flows.length; i++) {
              const flow = data.flows[i];
              if (flow.type === 'sequenceFlow') {
                diagram._drawFlow(flow);
              } else if (flow.type === 'association') {
                diagram._drawAssociation(flow);
              }
            }
          }
        }
      },
    },
  };
</script>

<style scoped>

</style>