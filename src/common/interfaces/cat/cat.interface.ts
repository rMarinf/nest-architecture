import { Document } from 'mongoose';
import { BasicInterface } from '../general/basic.interface';

export interface Cat extends Document, BasicInterface {
  name: string;
  age: number;
  breed: string;
}
