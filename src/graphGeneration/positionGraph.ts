import { Graph, GraphComponent } from "./generateGraph";

type DequeElem = [number, number, GraphComponent];

export const positionGraph = (graph: Graph) => {
  const deque: DequeElem[] = [[100, window.innerHeight / 2, graph[1]]];
  while (deque.length > 0) {
    let curr = deque.shift();
    if (!curr) {
      break;
    }
    let [x, y, node] = curr;
    node.x = x;
    node.y = y;
    node.childrenIds
      .map((id) => {
        return [
          x + 100,
          window.innerHeight / 2,
          graph[parseInt(id)] as GraphComponent,
        ] as DequeElem;
      })
      .forEach((curr: DequeElem) => deque.push(curr));
  }
  return graph;
};
