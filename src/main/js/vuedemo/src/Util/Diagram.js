export default class FlowDiagram {
  constructor(paper) {
    this.paper = paper;
    this.CURRENT_COLOR = '#017501';
    this.COMPLETED_COLOR = '#2632aa';
    this.MAIN_STROKE_COLOR = '#585858';
    this.NORMAL_STROKE = 1;
    this.ENDEVENT_STROKE = 3;
    this.ACTIVITY_STROKE_COLOR = "#bbbbbb";
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
    const eventOpacity = 1.0;

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
      this._drawAlfrescoPublishTaskIcon(this.paper, element.x + 4, element.y + 4);
    } else if (element.taskType === 'rest_call') {
      this._drawRestCallTaskIcon(this.paper, element.x + 4, element.y + 4);
    } else if (element.stencilIconId) {
      this.paper.image('../service/stencilitem/' + element.stencilIconId + '/icon',
        element.x + 4, element.y + 4, 16, 16);
    } else {
      this._drawServiceTaskIcon(this.paper, element.x + 4, element.y + 4);
    }
    this._addHoverLogic(element, 'rect', this.ACTIVITY_STROKE_COLOR);
  }
}