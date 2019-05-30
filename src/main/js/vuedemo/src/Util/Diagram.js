export default class FlowDiagram {
  constructor(paper) {
    this.paper = paper;
    this.CURRENT_COLOR = '#017501';
    this.COMPLETED_COLOR = '#2632aa';
    this.MAIN_STROKE_COLOR = '#585858';
    this.NORMAL_STROKE = 1;
    this.ENDEVENT_STROKE = 3;
    this.ACTIVITY_STROKE_COLOR = '#bbbbbb';
    this.ACTIVITY_FILL_COLOR = '#f9f9f9';
    this.CALL_ACTIVITY_STROKE = 2;
    this.ACTIVITY_FILL_COLOR = '#f9f9f9';
    this.CUSTOM_OPACITY = 1.0;
  }

  _getColor(element, defaultColor) {
    let strokeColor;
    if (element.current) {
      strokeColor = this.CURRENT_COLOR;
    } else if (element.completed) {
      strokeColor = this.COMPLETED_COLOR;
    } else {
      strokeColor = defaultColor;
    }
    return strokeColor;
  };

  _drawPool(pool) {
    const rect = this.paper.rect(pool.x, pool.y, pool.width, pool.height);

    rect.attr({
      'stroke-width': 1,
      'stroke': '#000000',
      'fill': 'white',
    });

    if (pool.name) {
      const poolName = this.paper.text(pool.x + 14, pool.y + (pool.height / 2),
        pool.name).attr({
        'text-anchor': 'middle',
        'font-family': 'Arial',
        'font-size': '12',
        'fill': '#000000',
      });

      poolName.transform('r270');
    }

    if (pool.lanes) {
      for (let i = 0; i < pool.lanes.length; i++) {
        const lane = pool.lanes[i];
        this._drawLane(lane);
      }
    }
  }

  _drawLane(lane) {
    const rect = this.paper.rect(lane.x, lane.y, lane.width, lane.height);

    rect.attr({
      'stroke-width': 1,
      'stroke': '#000000',
      'fill': 'white',
    });

    if (lane.name) {
      const laneName = this.paper.text(lane.x + 10, lane.y + (lane.height / 2),
        lane.name).attr({
        'text-anchor': 'middle',
        'font-family': 'Arial',
        'font-size': '12',
        'fill': '#000000',
      });

      laneName.transform('r270');
    }
  }

  _drawSubProcess(element) {
    const rect = this.paper.rect(element.x, element.y, element.width,
      element.height,
      4);

    const strokeColor = this._getColor(element, this.MAIN_STROKE_COLOR);

    rect.attr({
      'stroke-width': 1,
      'stroke': strokeColor,
      'fill': 'white',
    });
  }

  _drawTransaction(element) {
    const rect = this.paper.rect(element.x, element.y, element.width,
      element.height, 4);

    const strokeColor = this._getColor(element, this.MAIN_STROKE_COLOR);

    rect.attr({
      'stroke-width': 1,
      'stroke': strokeColor,
      'fill': 'white',
    });

    const borderRect = this.paper.rect(element.x + 2, element.y + 2,
      element.width - 4,
      element.height - 4, 4);

    borderRect.attr({
      'stroke-width': 1,
      'stroke': 'black',
      'fill': 'none',
    });
  }

  _drawEventSubProcess(element) {
    const rect = this.paper.rect(element.x, element.y, element.width,
      element.height,
      4);
    const strokeColor = this._getColor(element, this.MAIN_STROKE_COLOR);

    rect.attr({
      'stroke-width': 1,
      'stroke': strokeColor,
      'stroke-dasharray': '.',
      'fill': 'white',
    });
  }

  _drawStartEvent(element) {
    const startEvent = this._drawEvent(element, this.NORMAL_STROKE, 15);
    startEvent.click(function () {
      this._zoom(true);
    });
    this._addHoverLogic(element, 'circle', this.MAIN_STROKE_COLOR);
  }

  _drawEndEvent(element) {
    const endEvent = this._drawEvent(element, this.ENDEVENT_STROKE, 14);
    endEvent.click(function () {
      this._zoom(false);
    });
    this._addHoverLogic(element, 'circle', this.MAIN_STROKE_COLOR);
  }

  _drawEvent(element, strokeWidth, radius) {
    const x = element.x + (element.width / 2);
    const y = element.y + (element.height / 2);

    const circle = this.paper.circle(x, y, radius);

    const strokeColor = _bpmnGetColor(element, this.MAIN_STROKE_COLOR);

    // Fill
    const eventFillColor = _determineCustomFillColor(element, '#ffffff');

    // Opacity
    const eventOpacity = this.CUSTOM_OPACITY;

    circle.attr({
      'stroke-width': strokeWidth,
      'stroke': strokeColor,
      'fill': eventFillColor,
      'fill-opacity': eventOpacity,
    });

    circle.id = element.id;

    this._drawEventIcon(this.paper, element);

    return circle;
  }

  _drawServiceTask(element) {
    this._drawTask(element);
    if (element.taskType === 'mail') {
      this._drawSendTaskIcon(this.paper, element.x + 4, element.y + 4);
    } else if (element.taskType === 'camel') {
      this._drawCamelTaskIcon(this.paper, element.x + 4, element.y + 4);
    } else if (element.taskType === 'mule') {
      this._drawMuleTaskIcon(this.paper, element.x + 4, element.y + 4);
    } else if (element.taskType === 'alfresco_publish') {
      this._drawAlfrescoPublishTaskIcon(this.paper, element.x + 4,
        element.y + 4);
    } else if (element.taskType === 'rest_call') {
      this._drawRestCallTaskIcon(this.paper, element.x + 4, element.y + 4);
    } else if (element.stencilIconId) {
      this.paper.image(
        '../service/stencilitem/' + element.stencilIconId + '/icon',
        element.x + 4, element.y + 4, 16, 16);
    } else {
      this._drawServiceTaskIcon(this.paper, element.x + 4, element.y + 4);
    }
    this._addHoverLogic(element, 'rect', this.ACTIVITY_STROKE_COLOR);
  }

  _drawCallActivity(element) {
    const width = element.width - (this.CALL_ACTIVITY_STROKE / 2);
    const height = element.height - (this.CALL_ACTIVITY_STROKE / 2);

    const rect = this.paper.rect(element.x, element.y, width, height, 4);

    const strokeColor = this._getColor(element, this.ACTIVITY_STROKE_COLOR);

    // Fill
    const callActivityFillColor = this._determineCustomFillColor(element,
      this.ACTIVITY_FILL_COLOR);

    // Opacity
    const callActivityOpacity = this.CUSTOM_OPACITY;

    rect.attr({
      'stroke-width': CALL_ACTIVITY_STROKE,
      'stroke': strokeColor,
      'fill': callActivityFillColor,
      'fill-opacity': callActivityOpacity,
    });

    rect.id = element.id;

    if (element.name) {
      this._drawMultilineText(element.name, element.x, element.y, element.width,
        element.height, 'middle', 'middle', 11);
    }
    this._addHoverLogic(element, 'rect', this.ACTIVITY_STROKE_COLOR);
  }

  _drawScriptTask(element) {
    this._drawTask(element);
    this._drawScriptTaskIcon(this.paper, element.x + 4, element.y + 4);
    this._addHoverLogic(element, 'rect', this.ACTIVITY_STROKE_COLOR);
  }

  _drawUserTask(element) {
    this._drawTask(element);
    this._drawUserTaskIcon(this.paper, element.x + 4, element.y + 4);
    this._addHoverLogic(element, 'rect', this.ACTIVITY_STROKE_COLOR);
  }

  _drawBusinessRuleTask(element) {
    this._drawTask(element);
    this._drawBusinessRuleTaskIcon(this.paper, element.x + 4, element.y + 4);
    this._addHoverLogic(element, 'rect', this.ACTIVITY_STROKE_COLOR);
  }

  _drawManualTask(element) {
    this._drawTask(element);
    this._drawManualTaskIcon(this.paper, element.x + 4, element.y + 4);
    this._addHoverLogic(element, 'rect', this.ACTIVITY_STROKE_COLOR);
  }

  _drawSendTask(element) {
    this._drawTask(element);
    this._drawSendTaskIcon(this.paper, element.x + 4, element.y + 4);
    this._addHoverLogic(element, 'rect', this.ACTIVITY_STROKE_COLOR);
  }

  _drawReceiveTask(element) {
    this._drawTask(element);
    this._drawReceiveTaskIcon(this.paper, element.x, element.y);
    this._addHoverLogic(element, 'rect', this.ACTIVITY_STROKE_COLOR);
  }

  _drawTask(element) {
    const rectAttrs = {};

    // Stroke
    const strokeColor = this._getColor(element, this.ACTIVITY_STROKE_COLOR);
    rectAttrs['stroke'] = strokeColor;

    let strokeWidth;
    if (strokeColor === this.ACTIVITY_STROKE_COLOR) {
      strokeWidth = this.TASK_STROKE;
    } else {
      strokeWidth = this.TASK_HIGHLIGHT_STROKE;
    }

    const width = element.width - (strokeWidth / 2);
    const height = element.height - (strokeWidth / 2);

    const rect = paper.rect(element.x, element.y, width, height, 4);
    rectAttrs['stroke-width'] = strokeWidth;

    // Fill
    rectAttrs['fill'] = this._determineCustomFillColor(element,
      ACTIVITY_FILL_COLOR);

    // Opacity
    rectAttrs['fill-opacity'] = this.CUSTOM_OPACITY;

    rect.attr(rectAttrs);
    rect.id = element.id;

    if (element.name) {
      this._drawMultilineText(element.name, element.x, element.y, element.width,
        element.height, 'middle', 'middle', 11);
    }
  }

  _drawExclusiveGateway(element) {
    this._drawGateway(element);
    const quarterWidth = element.width / 4;
    const quarterHeight = element.height / 4;

    var iks = this.paper.path(
      'M' + (element.x + quarterWidth + 3) + ' ' +
      (element.y + quarterHeight + 3) +
      'L' + (element.x + 3 * quarterWidth - 3) + ' ' +
      (element.y + 3 * quarterHeight - 3) +
      'M' + (element.x + quarterWidth + 3) + ' ' +
      (element.y + 3 * quarterHeight - 3) +
      'L' + (element.x + 3 * quarterWidth - 3) + ' ' +
      (element.y + quarterHeight + 3),
    );

    const strokeColor = this._getColor(element, MAIN_STROKE_COLOR);

    // Fill
    const gatewayFillColor = this._determineCustomFillColor(element,
      this.ACTIVITY_FILL_COLOR);

    // Opacity
    const gatewayOpacity = this.CUSTOM_OPACITY;

    iks.attr({
      'stroke-width': 3,
      'stroke': strokeColor,
      'fill': gatewayFillColor,
      'fill-opacity': gatewayOpacity,
    });

    this._addHoverLogic(element, 'rhombus', this.MAIN_STROKE_COLOR);
  }

  _drawParallelGateway(element) {
    this._drawGateway(element);

    const strokeColor = this._getColor(element, this.MAIN_STROKE_COLOR);

    const path1 = this.paper.path('M 6.75,16 L 25.75,16 M 16,6.75 L 16,25.75');

    // Fill
    const gatewayFillColor = this._determineCustomFillColor(element,
      this.ACTIVITY_FILL_COLOR);

    // Opacity
    const gatewayOpacity = this.CUSTOM_OPACITY;

    path1.attr({
      'stroke-width': 3,
      'stroke': strokeColor,
      'fill': gatewayFillColor,
      'fill-opacity': gatewayOpacity,
    });

    path1.transform('T' + (element.x + 4) + ',' + (element.y + 4));

    this._addHoverLogic(element, 'rhombus', this.MAIN_STROKE_COLOR);
  }

  _drawInclusiveGateway(element) {
    this._drawGateway(element);

    const strokeColor = this._getColor(element, this.MAIN_STROKE_COLOR);

    const circle1 = this.paper.circle(element.x + (element.width / 2),
      element.y + (element.height / 2), 9.75);

    // Fill
    const gatewayFillColor = this._determineCustomFillColor(element,
      this.ACTIVITY_FILL_COLOR);

    // Opacity
    const gatewayOpacity = this.CUSTOM_OPACITY;

    circle1.attr({
      'stroke-width': 2.5,
      'stroke': strokeColor,
      'fill': gatewayFillColor,
      'fill-opacity': gatewayOpacity,
    });

    this._addHoverLogic(element, 'rhombus', this.MAIN_STROKE_COLOR);
  }

  _drawEventGateway(element) {
    this._drawGateway(element);

    const strokeColor = this._getColor(element, MAIN_STROKE_COLOR);

    const circle1 = this.paper.circle(element.x + (element.width / 2),
      element.y + (element.height / 2), 10.4);

    // Fill
    const gatewayFillColor = this._determineCustomFillColor(element,
      this.ACTIVITY_FILL_COLOR);

    // Opacity
    const gatewayOpacity = this.CUSTOM_OPACITY;

    circle1.attr({
      'stroke-width': 0.5,
      'stroke': strokeColor,
      'fill': gatewayFillColor,
      'fill-opacity': gatewayOpacity,
    });

    const circle2 = this.paper.circle(element.x + (element.width / 2),
      element.y + (element.height / 2), 11.7);
    circle2.attr({
      'stroke-width': 0.5,
      'stroke': strokeColor,
      'fill': gatewayFillColor,
      'fill-opacity': gatewayOpacity,
    });

    const path1 = this.paper.path(
      'M 20.327514,22.344972 L 11.259248,22.344216 L 8.4577203,13.719549 L 15.794545,8.389969 L 23.130481,13.720774 L 20.327514,22.344972 z');
    path1.attr({
      'stroke-width': 1.39999998,
      'stroke': strokeColor,
      'fill': gatewayFillColor,
      'fill-opacity': gatewayOpacity,
      'stroke-linejoin': 'bevel',
    });

    path1.transform('T' + (element.x + 4) + ',' + (element.y + 4));

    this._addHoverLogic(element, 'rhombus', this.MAIN_STROKE_COLOR);
  }

  _drawGateway(element) {
    const strokeColor = this._getColor(element, MAIN_STROKE_COLOR);

    const rhombus = this.paper.path(
      'M' + element.x + ' ' + (element.y + (element.height / 2)) +
      'L' + (element.x + (element.width / 2)) + ' ' +
      (element.y + element.height) +
      'L' + (element.x + element.width) + ' ' +
      (element.y + (element.height / 2)) +
      'L' + (element.x + (element.width / 2)) + ' ' + element.y + 'z',
    );

    // Fill
    const gatewayFillColor = this._determineCustomFillColor(element,
      this.ACTIVITY_FILL_COLOR);

    // Opacity
    const gatewayOpacity = this.CUSTOM_OPACITY;

    rhombus.attr('stroke-width', 2);
    rhombus.attr('stroke', strokeColor);
    rhombus.attr('fill', gatewayFillColor);
    rhombus.attr('fill-opacity', gatewayOpacity);

    rhombus.id = element.id;

    return rhombus;
  }
}