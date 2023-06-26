import { Circle, Line } from "react-konva";
import { Graph, GraphComponent, Green } from "./generateGraph";

export const addLinesToGraph = (graph: Graph) => {
  const deque: number[] = [1];
  while (deque.length > 0) {
    let currId = deque.shift();
    if (!currId) {
      break;
    }
    let curr = graph[currId];
    if (curr.elementType == Line) {
      break;
    }
    let end = Object.keys(graph).length;
    curr.childrenIds.forEach((id: string) => deque.push(parseInt(id)));

    curr.childrenIds.forEach((id: string, i) => {
      if (!currId) {
        return;
      }
      curr.childrenIds[i] = end.toString();
      let halfX = (graph[parseInt(id)].x + curr.x) / 2;
      let halfY = (graph[parseInt(id)].y + curr.y) / 2;
      graph[end] = {
        x: curr.x,
        y: curr.y,
        x2: halfX,
        y2: halfY,
        parentIds: [currId.toString()],
        childrenIds: [(end + 1).toString()],
        isDragging: false,
        color: Green,
        elementType: Line,
      };

      end += 1;

      graph[end] = {
        x: halfX,
        y: halfY,
        parentIds: [(end - 1).toString()],
        childrenIds: [(end + 1).toString()],
        isDragging: false,
        color: "red",
        elementType: Circle,
      };

      end += 1;

      graph[end] = {
        x: halfX,
        y: halfY,
        x2: graph[parseInt(id)].x,
        y2: graph[parseInt(id)].y,
        parentIds: [(end - 1).toString()],
        childrenIds: [id],
        isDragging: false,
        color: Green,
        elementType: Line,
      };

      graph[parseInt(id)].parentIds[0] = end.toString();
    });
  }
  return graph;
};
