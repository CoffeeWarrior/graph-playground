import React from "react";

import "./App.css";

import { Stage, Layer, Circle, Text, Line } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import _ from "lodash";
import {
  Blue,
  Graph,
  Green,
  generateGraph,
} from "./graphGeneration/generateGraph";

const INITIAL_STATE = generateGraph();

function App() {
  const [graphComponents, setGraphComponents] = React.useState(INITIAL_STATE);

  const updateClosest = (x: number, y: number, selectedId: number) => {
    const newState = _.cloneDeep(graphComponents);
    let closest = 0;
    let dist = Infinity;

    console.log(newState[0], newState[9]);

    Object.keys(newState).map((k) => {
      const id = parseInt(k);
      if (id === selectedId) {
        return;
      }
      let { x: currX, y: currY } = newState[id];

      // if ([0, 9].includes(id)) {
      //   console.log(id, currX, currY);
      // }
      let curr = Math.sqrt(Math.abs(currX - x) ** 2 + Math.abs(currY - y) ** 2);
      dist = Math.min(curr, dist);
      if (dist === curr) {
        closest = id;
      }
      newState[id].color = Green;
    });

    newState[closest].color = Blue;
    setGraphComponents(newState);
  };

  const updateDragged = (id: number, val: boolean) => {
    setGraphComponents((prevState: Graph) => {
      const newState = _.cloneDeep(prevState);

      const queue = [id];
      while (queue.length > 0) {
        let id = queue.shift();
        if (!id) {
          continue;
        }
        newState[id].isDragging = val;
        if (newState[id].childrenIds.length > 0) {
          queue.push(...newState[id].childrenIds.map((id) => parseInt(id)));
        }
      }

      return newState;
    });
  };

  const handleDragStart = (e: KonvaEventObject<DragEvent>) => {
    const id = parseInt(e.target.id(), 10);
    //find id of obj being moved
    //set isDragging True
    updateDragged(id, true);
  };

  const onDragMove = (e: KonvaEventObject<DragEvent>) => {
    const id = parseInt(e.target.id(), 10);
    //find id of obj being moved
    //set isDragging True
    //create queue of obj's and their children to be updated
    setGraphComponents((prevState: Graph) => {
      const newState = _.cloneDeep(prevState);
      const startX = newState[id].x;
      const startY = newState[id].y;
      const queue = [id];
      while (queue.length > 0) {
        let id = queue.shift();
        if (!id) {
          continue;
        }
        let relativeX = newState[id].x - startX;
        let relativeY = newState[id].y - startY;

        newState[id].x = relativeX + e.target.x();
        newState[id].y = relativeY + e.target.y();
        if (newState[id].childrenIds.length > 0) {
          queue.push(...newState[id].childrenIds.map((id) => parseInt(id)));
        }
      }

      return newState;
    });

    updateClosest(e.target.x(), e.target.y(), id);
  };

  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    //find id of obj being moved
    //set isDragging False
    const id = parseInt(e.target.id(), 10);
    //find id of obj being moved
    //set isDragging True
    updateDragged(id, false);
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text text="Try to drag a circle" />
        {Object.keys(graphComponents).map((key) => (
          <Circle
            key={key}
            radius={parseInt(key) * 10 + 10}
            id={key}
            x={graphComponents[parseInt(key)].x}
            y={graphComponents[parseInt(key)].y}
            numPoints={5}
            fill={graphComponents[parseInt(key)].color}
            opacity={0.8}
            draggable
            shadowColor="black"
            shadowBlur={10}
            shadowOpacity={0.6}
            shadowOffsetX={graphComponents[parseInt(key)].isDragging ? 10 : 5}
            shadowOffsetY={graphComponents[parseInt(key)].isDragging ? 10 : 5}
            scaleX={graphComponents[parseInt(key)].isDragging ? 1.2 : 1}
            scaleY={graphComponents[parseInt(key)].isDragging ? 1.2 : 1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragMove={onDragMove}
          />
        ))}
      </Layer>
    </Stage>
  );
}

export default App;
