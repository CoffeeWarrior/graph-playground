import React from "react";
import { Line, Circle } from "react-konva";

type KonvaElem = typeof Line | typeof Circle;

type GraphComponentState = {
  id: string;
  x: number;
  y: number;
  isDragging: boolean;
};

class GraphComponent extends React.Component {
  state: GraphComponentState;
  parents: GraphComponent[];
  children: GraphComponent[];
  component: KonvaElem;

  constructor(c: KonvaElem, i: number) {
    super(c);
    this.parents = [];
    this.children = [];
    this.component = c;
    this.state = {
      id: i.toString(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      isDragging: false,
    };
  }

  render() {
    return (
      <this.component
        key={this.state.id}
        radius={20}
        id={this.state.id}
        x={this.state.x}
        y={this.state.y}
        numPoints={5}
        fill="#89b717"
        opacity={0.8}
        draggable
        shadowColor="black"
        shadowBlur={10}
        shadowOpacity={0.6}
        shadowOffsetX={this.state.isDragging ? 10 : 5}
        shadowOffsetY={this.state.isDragging ? 10 : 5}
        scaleX={this.state.isDragging ? 1.2 : 1}
        scaleY={this.state.isDragging ? 1.2 : 1}
      ></this.component>
    );
  }
}

export default GraphComponent;
