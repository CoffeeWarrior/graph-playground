import { Circle, Line } from "react-konva";

export type GraphComponent = {
  x: number;
  y: number;
  x2?: number;
  y2?: number;
  parentIds: string[];
  childrenIds: string[];
  isDragging: boolean;
  color: string;
  elementType: elementType;
};

export const Blue = "#5C5CFF";
export const Green = "#89b717";

export type elementType = typeof Circle | typeof Line;

export type Graph = {
  [key: number]: GraphComponent;
};

export const generateGraph = () => {
  const graph = {} as Graph;

  // let x = 7;
  // [...Array(x)].forEach(
  //   (_, i) =>
  //     (graph[i] = {
  //       x: Math.random() * window.innerWidth,
  //       y: Math.random() * window.innerHeight,
  //       parentIds: i != 0 ? [(i - 1).toString()] : [],
  //       childrenIds: i != x - 1 ? [(i + 1).toString()] : [],
  //       isDragging: false,
  //       color: Green,
  //       elementType: Circle,
  //     })
  // );
  graph[0] = {
    x: -50,
    y: -50,
    parentIds: [],
    childrenIds: [],
    isDragging: false,
    color: Green,
    elementType: Circle,
  };
  graph[1] = {
    x: 100,
    y: window.innerHeight / 2,
    parentIds: [],
    childrenIds: ["2"],
    isDragging: false,
    color: Green,
    elementType: Circle,
  };
  /**      */
  graph[2] = {
    x: 0,
    y: 0,
    parentIds: ["1"],
    childrenIds: ["3"],
    isDragging: false,
    color: Green,
    elementType: Line,
  };
  /** */
  graph[3] = {
    x: 200,
    y: 200,
    parentIds: ["2"],
    childrenIds: [],
    isDragging: false,
    color: Green,
    elementType: Circle,
  };
  return graph;
};
