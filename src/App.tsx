import React from "react";

import "./App.css";

import { Stage, Layer, Circle, Text, Line } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import _, { set } from "lodash";
import {
  Blue,
  Graph,
  Green,
  generateGraph,
} from "./graphGeneration/generateGraph";
import { handleLineDraw } from "./handleLineDraw";
import { positionGraph } from "./graphGeneration/positionGraph";
import { addLinesToGraph } from "./graphGeneration/addLinesToGraph";

const INITIAL_STATE = addLinesToGraph(positionGraph(generateGraph()));

//current task:
const removeLines = (graph: Graph) => {
  let deque = [1];
  while (deque.length > 1) {
    let currId = deque.shift();
    if (!currId) {
      break;
    }
  }
};

const removeGhosts = () => {};

const updateClosest = (
  x: number,
  y: number,
  selectedId: number,
  prevState: Graph
) => {
  const newState = _.cloneDeep(prevState);
  let closest = 0;
  let dist = Infinity;

  Object.keys(newState).map((k) => {
    const id = parseInt(k);
    let deque = [selectedId];
    while (deque.length > 0) {
      let i = deque.shift();
      if (!i) {
        break;
      }
      if (id === i) {
        return;
      }
      newState[i].childrenIds.forEach((id: string) => deque.push(parseInt(id)));
    }
    if (id === selectedId) {
      return;
    }
    if (newState[id].elementType == Line) {
      return;
    }
    let { x: currX, y: currY } = newState[id];

    let curr = Math.sqrt(Math.abs(currX - x) ** 2 + Math.abs(currY - y) ** 2);
    dist = Math.min(curr, dist);
    if (dist === curr) {
      closest = id;
    }
    newState[id].color = Green;
  });

  newState[closest].color = Blue;
  return newState;
};

const adjustGraph = (graph: Graph, selectedId: number) => {
  const deque = [1];
  let closest = 1;
  while (deque.length > 0) {
    const currId = deque.shift();
    if (!currId) {
      break;
    }
    if (graph[currId].color === Blue) {
      closest = currId;
      break;
    }
    graph[currId].childrenIds.forEach((id: string) => deque.push(parseInt(id)));
  }
  let parentOfClosest = graph[parseInt(graph[closest].parentIds[0])];
  parentOfClosest.childrenIds = parentOfClosest.childrenIds.filter(
    (id: string) => parseInt(id) != closest
  );
  graph[closest].parentIds[0] = selectedId.toString();

  graph[selectedId].childrenIds.push(closest.toString());

  return graph;
};

function App() {
  const [graphComponents, setGraphComponents] = React.useState(INITIAL_STATE);

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

  const onDragMove = (e: KonvaEventObject<DragEvent>) => {
    const id = parseInt(e.target.id(), 10);
    //find id of obj being moved
    //set isDragging True
    //create queue of obj's and their children to be updated
    //updateClosest(e.target.x(), e.target.y(), id);
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
        if (newState[id]?.x2 !== undefined && newState[id]?.y2 !== undefined) {
          newState[id].x2 = newState[id].x2! - startX + e.target.x();
          newState[id].y2 = newState[id].y2! - startY + e.target.y();
        }
        if (newState[id].childrenIds.length > 0) {
          queue.push(...newState[id].childrenIds.map((id) => parseInt(id)));
        }
      }

      return newState;
    });
    setGraphComponents((prevState: Graph) =>
      updateClosest(e.target.x(), e.target.y(), id, prevState)
    );
  };
  const handleDragStart = (e: KonvaEventObject<DragEvent>) => {
    const id = parseInt(e.target.id(), 10);
    //find id of obj being moved
    //set isDragging True
    updateDragged(id, true);
  };

  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    //find id of obj being moved
    //set isDragging False
    const id = parseInt(e.target.id(), 10);
    //find id of obj being moved
    //set isDragging True
    updateDragged(id, false);

    //break graph
    //remerge
    setGraphComponents((newState) => adjustGraph(newState, id));
    //remove all lines / ghost nodes
    setGraphComponents((newState) => {
      console.log(newState);
      return newState;
    });
    //redraw graph
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text text="Try to drag a circle" />
        {Object.keys(graphComponents).map((key) => {
          return graphComponents[parseInt(key)].elementType === Circle ? (
            <Circle
              key={key}
              radius={10}
              id={key}
              x={graphComponents[parseInt(key)].x}
              y={graphComponents[parseInt(key)].y}
              numPoints={5}
              fill={graphComponents[parseInt(key)].color}
              opacity={0.8}
              draggable={!graphComponents[parseInt(key)].notDraggable}
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
          ) : (
            handleLineDraw(graphComponents, parseInt(key))
          );
        })}
      </Layer>
    </Stage>
  );
}

export default App;
