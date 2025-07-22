import { ExtendibleHashTable, HashBucket } from '../types/database';

export class ExtendibleHashingImplementation {
  private hashTable: ExtendibleHashTable;
  private bucketCounter: number = 0;

  constructor(bucketSize: number = 4) {
    const initialBucketId = this.generateBucketId();
    const initialBucket: HashBucket = {
      id: initialBucketId,
      localDepth: 0,
      records: [],
      maxSize: bucketSize
    };

    this.hashTable = {
      globalDepth: 0,
      directory: [initialBucketId],
      buckets: new Map([[initialBucketId, initialBucket]]),
      bucketSize
    };
  }

  private generateBucketId(): string {
    return `bucket_${++this.bucketCounter}`;
  }

  private hash(key: string): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      const char = key.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  private getBucketIndex(key: string): number {
    const hashValue = this.hash(key);
    const mask = (1 << this.hashTable.globalDepth) - 1;
    return hashValue & mask;
  }

  public insert(key: string, value: any): { success: boolean; operations: string[] } {
    const operations: string[] = [];
    const startTime = performance.now();
    
    operations.push(`Inserting key "${key}" with value ${JSON.stringify(value)}`);
    
    const bucketIndex = this.getBucketIndex(key);
    const bucketId = this.hashTable.directory[bucketIndex];
    const bucket = this.hashTable.buckets.get(bucketId)!;
    
    operations.push(`Hash value: ${this.hash(key)}, Directory index: ${bucketIndex}, Bucket: ${bucketId}`);

    // Check if key already exists
    const existingIndex = bucket.records.findIndex(record => record.key === key);
    if (existingIndex !== -1) {
      bucket.records[existingIndex].value = value;
      operations.push(`Key "${key}" already exists, updated value`);
      return { success: true, operations };
    }

    // Try to insert into bucket
    if (bucket.records.length < bucket.maxSize) {
      bucket.records.push({ key, value });
      operations.push(`Inserted into bucket ${bucketId} (${bucket.records.length}/${bucket.maxSize})`);
      
      const endTime = performance.now();
      operations.push(`Insertion completed in ${(endTime - startTime).toFixed(2)}ms`);
      return { success: true, operations };
    }

    // Bucket is full, need to split
    operations.push(`Bucket ${bucketId} is full, splitting required`);
    return this.splitBucket(bucketId, key, value, operations);
  }

  private splitBucket(bucketId: string, newKey: string, newValue: any, operations: string[]): 
    { success: boolean; operations: string[] } {
    
    const bucket = this.hashTable.buckets.get(bucketId)!;
    
    // Check if we need to double the directory
    if (bucket.localDepth === this.hashTable.globalDepth) {
      this.doubleDirectory(operations);
    }

    // Create new bucket
    const newBucketId = this.generateBucketId();
    const newBucket: HashBucket = {
      id: newBucketId,
      localDepth: bucket.localDepth + 1,
      records: [],
      maxSize: bucket.maxSize
    };

    bucket.localDepth++;
    this.hashTable.buckets.set(newBucketId, newBucket);
    
    operations.push(`Created new bucket ${newBucketId}, increased local depth to ${bucket.localDepth}`);

    // Redistribute records
    const allRecords = [...bucket.records, { key: newKey, value: newValue }];
    bucket.records = [];
    
    for (const record of allRecords) {
      const hash = this.hash(record.key);
      const bit = (hash >> (bucket.localDepth - 1)) & 1;
      
      if (bit === 0) {
        bucket.records.push(record);
      } else {
        newBucket.records.push(record);
      }
    }

    operations.push(`Redistributed records: Bucket ${bucketId} has ${bucket.records.length}, Bucket ${newBucketId} has ${newBucket.records.length}`);

    // Update directory pointers
    this.updateDirectoryPointers(bucketId, newBucketId, operations);

    return { success: true, operations };
  }

  private doubleDirectory(operations: string[]): void {
    const oldSize = this.hashTable.directory.length;
    this.hashTable.directory = [...this.hashTable.directory, ...this.hashTable.directory];
    this.hashTable.globalDepth++;
    
    operations.push(`Directory doubled: size ${oldSize} -> ${this.hashTable.directory.length}, global depth: ${this.hashTable.globalDepth}`);
  }

  private updateDirectoryPointers(oldBucketId: string, newBucketId: string, operations: string[]): void {
    const bucket = this.hashTable.buckets.get(oldBucketId)!;
    const localDepth = bucket.localDepth;
    
    for (let i = 0; i < this.hashTable.directory.length; i++) {
      if (this.hashTable.directory[i] === oldBucketId) {
        const bit = (i >> (localDepth - 1)) & 1;
        if (bit === 1) {
          this.hashTable.directory[i] = newBucketId;
        }
      }
    }
    
    operations.push(`Updated directory pointers for new bucket distribution`);
  }

  public search(key: string): { found: boolean; value?: any; operations: string[] } {
    const operations: string[] = [];
    const startTime = performance.now();
    
    operations.push(`Searching for key "${key}"`);
    
    const bucketIndex = this.getBucketIndex(key);
    const bucketId = this.hashTable.directory[bucketIndex];
    const bucket = this.hashTable.buckets.get(bucketId)!;
    
    operations.push(`Hash value: ${this.hash(key)}, Directory index: ${bucketIndex}, Bucket: ${bucketId}`);

    const record = bucket.records.find(r => r.key === key);
    const endTime = performance.now();
    
    if (record) {
      operations.push(`Key "${key}" found in bucket ${bucketId}`);
      operations.push(`Search completed in ${(endTime - startTime).toFixed(2)}ms`);
      return { found: true, value: record.value, operations };
    } else {
      operations.push(`Key "${key}" not found in bucket ${bucketId}`);
      operations.push(`Search completed in ${(endTime - startTime).toFixed(2)}ms`);
      return { found: false, operations };
    }
  }

  public delete(key: string): { success: boolean; operations: string[] } {
    const operations: string[] = [];
    const startTime = performance.now();
    
    operations.push(`Deleting key "${key}"`);
    
    const bucketIndex = this.getBucketIndex(key);
    const bucketId = this.hashTable.directory[bucketIndex];
    const bucket = this.hashTable.buckets.get(bucketId)!;
    
    operations.push(`Hash value: ${this.hash(key)}, Directory index: ${bucketIndex}, Bucket: ${bucketId}`);

    const recordIndex = bucket.records.findIndex(r => r.key === key);
    
    if (recordIndex !== -1) {
      bucket.records.splice(recordIndex, 1);
      operations.push(`Key "${key}" deleted from bucket ${bucketId}`);
      
      // In a full implementation, we'd check for bucket merging opportunities
      if (bucket.records.length === 0 && bucket.localDepth > 0) {
        operations.push(`Bucket ${bucketId} is empty (would trigger merge check)`);
      }
      
      const endTime = performance.now();
      operations.push(`Deletion completed in ${(endTime - startTime).toFixed(2)}ms`);
      return { success: true, operations };
    } else {
      operations.push(`Key "${key}" not found for deletion`);
      const endTime = performance.now();
      operations.push(`Deletion completed in ${(endTime - startTime).toFixed(2)}ms`);
      return { success: false, operations };
    }
  }

  public getHashTable(): ExtendibleHashTable {
    return this.hashTable;
  }

  public getVisualizationData() {
    const directory = this.hashTable.directory.map((bucketId, index) => ({
      index,
      bucketId,
      binaryIndex: index.toString(2).padStart(this.hashTable.globalDepth, '0')
    }));

    const buckets = Array.from(this.hashTable.buckets.entries()).map(([id, bucket]) => ({
      id,
      localDepth: bucket.localDepth,
      records: bucket.records,
      utilization: (bucket.records.length / bucket.maxSize) * 100
    }));

    return {
      globalDepth: this.hashTable.globalDepth,
      directory,
      buckets
    };
  }
}