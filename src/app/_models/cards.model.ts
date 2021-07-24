import { Deserializable } from './deserializable.model';

export class CardsModel implements Deserializable {
  field: string;
  displayName: string;
  value: number;
  imageClass: string;
  format: string;
  config: [];
  color: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
