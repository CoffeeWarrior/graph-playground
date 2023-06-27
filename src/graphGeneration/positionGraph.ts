import { Graph, GraphComponent } from "./generateGraph";

type DequeElem = [number, number, GraphComponent];

export const positionGraph = (graph: Graph) => {
  const deque: DequeElem[] = [[100, 100, graph[1]]];
  while (deque.length > 0) {
    let curr = deque.shift();
    if (!curr) {
      break;
    }
    let [x, y, node] = curr;
    node.x = x;
    node.y = y;
    let childrenIdCount = node.childrenIds.length;
    node.childrenIds
      .map((id, i) => {
        return [
          x + 200,
          y + (100 * childrenIdCount) / (i + 1),
          graph[parseInt(id)] as GraphComponent,
        ] as DequeElem;
      })
      .forEach((curr: DequeElem) => deque.push(curr));
  }
  return graph;
};
