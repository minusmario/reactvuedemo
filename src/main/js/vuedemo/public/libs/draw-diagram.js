window.B_drawDiagram = function (data) {

  if ((!data.elements || data.elements.length == 0) &&
    (!data.pools || data.pools.length == 0)) return;

  INITIAL_CANVAS_WIDTH = data.diagramWidth;

  if (modelType == 'design') {
    INITIAL_CANVAS_WIDTH += 20;
  } else {
    INITIAL_CANVAS_WIDTH += 30;
  }

  INITIAL_CANVAS_HEIGHT = data.diagramHeight + 50;
  canvasWidth = INITIAL_CANVAS_WIDTH;
  canvasHeight = INITIAL_CANVAS_HEIGHT;
  viewBoxWidth = INITIAL_CANVAS_WIDTH;
  viewBoxHeight = INITIAL_CANVAS_HEIGHT;

  if (modelType == 'design') {
    var headerBarHeight = 170;
    var offsetY = 0;
    if (jQuery(window).height() > (canvasHeight + headerBarHeight)) {
      offsetY = (jQuery(window).height() - headerBarHeight - canvasHeight) / 2;
    }

    if (offsetY > 50) {
      offsetY = 50;
    }

    jQuery('#bpmnModel').css('marginTop', offsetY);
  }

  jQuery('#bpmnModel').width(INITIAL_CANVAS_WIDTH);
  jQuery('#bpmnModel').height(INITIAL_CANVAS_HEIGHT);
  paper = Raphael(document.getElementById('bpmnModel'), canvasWidth,
    canvasHeight);
  paper.setViewBox(0, 0, viewBoxWidth, viewBoxHeight, false);
  paper.renderfix();

  if (data.pools) {
    for (var i = 0; i < data.pools.length; i++) {
      var pool = data.pools[i];
      _drawPool(pool);
    }
  }

  var modelElements = data.elements;
  for (var i = 0; i < modelElements.length; i++) {
    var element = modelElements[i];
    //try {
    var drawFunction = eval('_draw' + element.type);
    drawFunction(element);
    //} catch(err) {console.log(err);}
  }

  if (data.flows) {
    for (var i = 0; i < data.flows.length; i++) {
      var flow = data.flows[i];
      if (flow.type === 'sequenceFlow') {
        _drawFlow(flow);
      } else if (flow.type === 'association') {
        _drawAssociation(flow);
      }
    }
  }
};