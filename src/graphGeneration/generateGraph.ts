import { Circle, Line } from "react-konva";

export type GraphComponent = {
  x: number;
  y: number;
  x2?: number;
  y2?: number;
  notDraggable?: boolean;
  parentIds: string[];
  childrenIds: string[];
  isDragging: boolean;
  color: string;
  elementType: elementType;
  originalColor: string;
  ghost: boolean;
};

export const Blue = "#5C5CFF";
export const Green = "#89b717";

export type elementType = typeof Circle | typeof Line;

export type Graph = {
  [key: number]: GraphComponent;
};

export const generateGraph = () => {
  const graph = {} as Graph;

  // let x = 3;
  // [...Array(x)].forEach(
  //   (_, i) =>
  //     (graph[i] = {
  //       x: i != 0 ? Math.random() * window.innerWidth : -500,
  //       y: Math.random() * window.innerHeight,
  //       parentIds: i != 0 ? [(i - 1).toString()] : [],
  //       childrenIds: i != x - 1 ? [(i + 1).toString()] : [],
  //       isDragging: false,
  //       color: Green,
  //       elementType: Circle,
  //       originalColor: Green,
  //       ghost: false,
  //     })
  // );
  // graph[0] = {
  //   x: -500,
  //   y: -500,
  //   parentIds: [],
  //   childrenIds: ["1"],
  //   isDragging: false,
  //   color: Green,
  //   elementType: Circle,
  //   originalColor: Green,
  //   ghost: false,
  // };
  graph[1] = {
    x: 100,
    y: 100,
    parentIds: [],
    childrenIds: ["2", "3"],
    isDragging: false,
    color: Green,
    elementType: Circle,
    originalColor: Green,
    ghost: false,
    notDraggable: true,
  };
  graph[2] = {
    x: 100,
    y: 100,
    parentIds: ["1"],
    childrenIds: ["4", "5"],
    isDragging: false,
    color: Green,
    elementType: Circle,
    originalColor: Green,
    ghost: false,
  };
  graph[3] = {
    x: 100,
    y: 100,
    parentIds: ["1"],
    childrenIds: ["6", "7"],
    isDragging: false,
    color: Green,
    elementType: Circle,
    originalColor: Green,
    ghost: false,
  };
  graph[4] = {
    x: 100,
    y: 100,
    parentIds: ["2"],
    childrenIds: [],
    isDragging: false,
    color: Green,
    elementType: Circle,
    originalColor: Green,
    ghost: false,
  };
  graph[5] = {
    x: 100,
    y: 200,
    parentIds: ["2"],
    childrenIds: [],
    isDragging: false,
    color: Green,
    elementType: Circle,
    originalColor: Green,
    ghost: false,
  };
  graph[6] = {
    x: 100,
    y: 100,
    parentIds: ["3"],
    childrenIds: [],
    isDragging: false,
    color: Green,
    elementType: Circle,
    originalColor: Green,
    ghost: false,
  };
  graph[7] = {
    x: 100,
    y: 100,
    parentIds: ["3"],
    childrenIds: [],
    isDragging: false,
    color: Green,
    elementType: Circle,
    originalColor: Green,
    ghost: false,
  };

  return graph;
};
