import { Graph, GraphComponent } from "./generateGraph";

type DequeElem = [number, number, number, GraphComponent];

export const positionGraph = (graph: Graph) => {
  const deque: DequeElem[] = [[100, 0, window.innerHeight, graph[1]]];
  while (deque.length > 0) {
    let curr = deque.shift();
    if (!curr) {
      break;
    }
    let [x, bottom, top, node] = curr;
    node.x = x;
    node.y = (top + bottom) / 2;
    let childrenIdCount = node.childrenIds.length;
    node.childrenIds
      .map((id, i) => {
        return [
          x + 200,
          ((top - bottom) / childrenIdCount) * i + bottom,
          ((top - bottom) / childrenIdCount) * (i + 1) + bottom,
          graph[parseInt(id)] as GraphComponent,
        ] as DequeElem;
      })
      .forEach((curr: DequeElem) => deque.push(curr));
  }
  return graph;
};
