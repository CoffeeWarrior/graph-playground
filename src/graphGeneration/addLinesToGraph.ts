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
    let end = Math.max(...Object.keys(graph).map((id) => parseInt(id))) + 1;
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
        originalColor: Green,
        ghost: false,
      };

      end += 1;

      graph[end] = {
        x: halfX,
        y: halfY,
        parentIds: [(end - 1).toString()],
        childrenIds: [(end + 1).toString()],
        isDragging: false,
        notDraggable: true,
        color: "red",
        elementType: Circle,
        originalColor: "red",
        ghost: true,
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
        originalColor: Green,
        ghost: false,
      };
      graph[parseInt(id)].parentIds[0] = end.toString();
      end += 1;
    });
  }
  return graph;
};
