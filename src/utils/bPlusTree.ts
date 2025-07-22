import { BPlusTree, BPlusTreeNode } from '../types/database';

export class BPlusTreeImplementation {
  private tree: BPlusTree;
  private nodeCounter: number = 0;

  constructor(order: number = 4) {
    const rootId = this.generateNodeId();
    const rootNode: BPlusTreeNode = {
      id: rootId,
      keys: [],
      values: [],
      isLeaf: true
    };

    this.tree = {
      root: rootId,
      nodes: new Map([[rootId, rootNode]]),
      order,
      height: 1
    };
  }

  private generateNodeId(): string {
    return `node_${++this.nodeCounter}`;
  }

  public insert(key: number, value: any): { success: boolean; operations: string[] } {
    const operations: string[] = [];
    const startTime = performance.now();
    
    operations.push(`Inserting key ${key} with value ${JSON.stringify(value)}`);
    
    const result = this.insertHelper(this.tree.root, key, value, operations);
    
    if (result.newRoot) {
      this.tree.root = result.newRoot;
      this.tree.height++;
      operations.push(`Tree height increased to ${this.tree.height}`);
    }

    const endTime = performance.now();
    operations.push(`Insertion completed in ${(endTime - startTime).toFixed(2)}ms`);
    
    return { success: true, operations };
  }

  private insertHelper(nodeId: string, key: number, value: any, operations: string[]): 
    { newRoot?: string; promotedKey?: number; promotedValue?: any } {
    
    const node = this.tree.nodes.get(nodeId)!;
    operations.push(`Visiting node ${nodeId} (${node.isLeaf ? 'leaf' : 'internal'})`);

    if (node.isLeaf) {
      return this.insertIntoLeaf(node, key, value, operations);
    } else {
      return this.insertIntoInternal(node, key, value, operations);
    }
  }

  private insertIntoLeaf(node: BPlusTreeNode, key: number, value: any, operations: string[]): 
    { newRoot?: string; promotedKey?: number; promotedValue?: any } {
    
    // Find insertion position
    let pos = 0;
    while (pos < node.keys.length && node.keys[pos] < key) {
      pos++;
    }

    // Insert key and value
    node.keys.splice(pos, 0, key);
    node.values!.splice(pos, 0, value);
    operations.push(`Inserted key ${key} at position ${pos} in leaf node`);

    // Check if split is needed
    if (node.keys.length > this.tree.order - 1) {
      operations.push(`Node overflow detected, splitting leaf node`);
      return this.splitLeafNode(node, operations);
    }

    return {};
  }

  private insertIntoInternal(node: BPlusTreeNode, key: number, value: any, operations: string[]): 
    { newRoot?: string; promotedKey?: number; promotedValue?: any } {
    
    // Find child to insert into
    let childIndex = 0;
    while (childIndex < node.keys.length && key >= node.keys[childIndex]) {
      childIndex++;
    }

    const childId = node.children![childIndex];
    const result = this.insertHelper(childId, key, value, operations);

    if (result.promotedKey !== undefined) {
      // Insert promoted key into this internal node
      node.keys.splice(childIndex, 0, result.promotedKey);
      // Note: In a full implementation, we'd handle promoted child pointers
      
      operations.push(`Promoted key ${result.promotedKey} inserted into internal node`);

      // Check if this node needs to split
      if (node.keys.length > this.tree.order - 1) {
        operations.push(`Internal node overflow, splitting`);
        return this.splitInternalNode(node, operations);
      }
    }

    return {};
  }

  private splitLeafNode(node: BPlusTreeNode, operations: string[]): 
    { newRoot?: string; promotedKey?: number; promotedValue?: any } {
    
    const mid = Math.floor(this.tree.order / 2);
    const newNodeId = this.generateNodeId();
    
    const newNode: BPlusTreeNode = {
      id: newNodeId,
      keys: node.keys.splice(mid),
      values: node.values!.splice(mid),
      isLeaf: true,
      next: node.next
    };

    node.next = newNodeId;
    this.tree.nodes.set(newNodeId, newNode);
    
    operations.push(`Split leaf node: left has ${node.keys.length} keys, right has ${newNode.keys.length} keys`);

    // If this is the root, create new root
    if (node.id === this.tree.root) {
      const newRootId = this.generateNodeId();
      const newRoot: BPlusTreeNode = {
        id: newRootId,
        keys: [newNode.keys[0]],
        children: [node.id, newNodeId],
        isLeaf: false
      };
      
      this.tree.nodes.set(newRootId, newRoot);
      operations.push(`Created new root node ${newRootId}`);
      
      return { newRoot: newRootId };
    }

    return { promotedKey: newNode.keys[0] };
  }

  private splitInternalNode(node: BPlusTreeNode, operations: string[]): 
    { newRoot?: string; promotedKey?: number; promotedValue?: any } {
    
    const mid = Math.floor(this.tree.order / 2);
    const promotedKey = node.keys[mid];
    const newNodeId = this.generateNodeId();
    
    const newNode: BPlusTreeNode = {
      id: newNodeId,
      keys: node.keys.splice(mid + 1),
      children: node.children!.splice(mid + 1),
      isLeaf: false
    };

    node.keys.splice(mid, 1); // Remove promoted key
    this.tree.nodes.set(newNodeId, newNode);
    
    operations.push(`Split internal node: promoted key ${promotedKey}`);

    // If this is the root, create new root
    if (node.id === this.tree.root) {
      const newRootId = this.generateNodeId();
      const newRoot: BPlusTreeNode = {
        id: newRootId,
        keys: [promotedKey],
        children: [node.id, newNodeId],
        isLeaf: false
      };
      
      this.tree.nodes.set(newRootId, newRoot);
      operations.push(`Created new root node ${newRootId}`);
      
      return { newRoot: newRootId };
    }

    return { promotedKey };
  }

  public search(key: number): { found: boolean; value?: any; operations: string[] } {
    const operations: string[] = [];
    const startTime = performance.now();
    
    operations.push(`Searching for key ${key}`);
    
    let currentId = this.tree.root;
    let depth = 0;

    while (currentId) {
      const node = this.tree.nodes.get(currentId)!;
      depth++;
      operations.push(`Level ${depth}: Visiting node ${currentId} with keys [${node.keys.join(', ')}]`);

      if (node.isLeaf) {
        const index = node.keys.indexOf(key);
        const endTime = performance.now();
        
        if (index !== -1) {
          operations.push(`Key ${key} found at index ${index} in leaf node`);
          operations.push(`Search completed in ${(endTime - startTime).toFixed(2)}ms`);
          return { found: true, value: node.values![index], operations };
        } else {
          operations.push(`Key ${key} not found in leaf node`);
          operations.push(`Search completed in ${(endTime - startTime).toFixed(2)}ms`);
          return { found: false, operations };
        }
      } else {
        // Find next child to visit
        let childIndex = 0;
        while (childIndex < node.keys.length && key >= node.keys[childIndex]) {
          childIndex++;
        }
        currentId = node.children![childIndex];
        operations.push(`Following child pointer ${childIndex}`);
      }
    }

    return { found: false, operations };
  }

  public delete(key: number): { success: boolean; operations: string[] } {
    const operations: string[] = [];
    const startTime = performance.now();
    
    operations.push(`Deleting key ${key}`);
    
    const result = this.deleteHelper(this.tree.root, key, operations);
    
    const endTime = performance.now();
    operations.push(`Deletion completed in ${(endTime - startTime).toFixed(2)}ms`);
    
    return { success: result, operations };
  }

  private deleteHelper(nodeId: string, key: number, operations: string[]): boolean {
    const node = this.tree.nodes.get(nodeId)!;
    operations.push(`Visiting node ${nodeId} for deletion`);

    if (node.isLeaf) {
      const index = node.keys.indexOf(key);
      if (index !== -1) {
        node.keys.splice(index, 1);
        node.values!.splice(index, 1);
        operations.push(`Key ${key} deleted from leaf node`);
        
        // In a full implementation, we'd handle underflow and merging
        if (node.keys.length < Math.floor(this.tree.order / 2) && node.id !== this.tree.root) {
          operations.push(`Leaf node underflow detected (would trigger merge/redistribute)`);
        }
        
        return true;
      }
      return false;
    } else {
      // Find child that might contain the key
      let childIndex = 0;
      while (childIndex < node.keys.length && key >= node.keys[childIndex]) {
        childIndex++;
      }
      
      return this.deleteHelper(node.children![childIndex], key, operations);
    }
  }

  public getTree(): BPlusTree {
    return this.tree;
  }

  public getVisualizationData() {
    const nodes: any[] = [];
    const edges: any[] = [];

    this.tree.nodes.forEach((node, id) => {
      nodes.push({
        id,
        label: node.isLeaf ? 
          `Leaf\n[${node.keys.join(', ')}]` : 
          `Internal\n[${node.keys.join(', ')}]`,
        type: node.isLeaf ? 'leaf' : 'internal',
        keys: node.keys,
        isLeaf: node.isLeaf
      });

      if (node.children) {
        node.children.forEach((childId, index) => {
          edges.push({
            from: id,
            to: childId,
            label: index.toString()
          });
        });
      }

      if (node.next && node.isLeaf) {
        edges.push({
          from: id,
          to: node.next,
          label: 'next',
          dashes: true,
          color: { color: '#848484' }
        });
      }
    });

    return { nodes, edges };
  }
}