export interface BPlusTreeNode {
  id: string;
  keys: number[];
  values?: any[];
  children?: string[];
  isLeaf: boolean;
  parent?: string;
  next?: string; // For leaf nodes linking
}

export interface BPlusTree {
  root: string;
  nodes: Map<string, BPlusTreeNode>;
  order: number;
  height: number;
}

export interface HashBucket {
  id: string;
  localDepth: number;
  records: Record<string, any>[];
  maxSize: number;
}

export interface ExtendibleHashTable {
  globalDepth: number;
  directory: string[];
  buckets: Map<string, HashBucket>;
  bucketSize: number;
}

export interface CSVData {
  headers: string[];
  rows: any[][];
}

export interface QueryResult {
  headers: string[];
  rows: any[][];
  executionTime: number;
  operationsUsed: string[];
}

export interface RelationalOperation {
  type: 'SELECT' | 'PROJECT' | 'JOIN' | 'UNION' | 'INTERSECTION' | 'DIFFERENCE';
  condition?: string;
  columns?: string[];
  joinColumn?: string;
  table2?: CSVData;
}

export interface DatabaseOperation {
  id: string;
  type: 'INSERT' | 'DELETE' | 'SEARCH' | 'QUERY';
  data: any;
  result?: any;
  timestamp: number;
  executionTime: number;
}