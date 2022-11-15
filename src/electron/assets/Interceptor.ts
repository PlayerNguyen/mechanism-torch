import fs from "fs";
import stream from "stream";
import { isDevelopment } from "../utils/Environment";

export interface Serializable<T> {
  serialize(obj: T): string;
  deserialize(string: string): T;
}

export interface IInterceptor<T extends Serializable<T>> {
  write(object: T, destination: fs.PathLike): Promise<void>;
  read(from: fs.PathLike): Promise<T>;
}

export abstract class JsonInterceptor<T extends JsonSerializable<T>>
  implements IInterceptor<T>
{
  write(object: T, destination: fs.PathLike): Promise<void> {
    return new Promise((res, rej) => {
      const _writer = fs.createWriteStream(destination);
      const serializedObject = object.serialize(object);
      const readable = stream.Readable.from(serializedObject);

      isDevelopment() &&
        console.log(
          `[::JsonInterceptor] write `,
          serializedObject,
          `into -> ${destination.toString()}`
        );

      readable.pipe(_writer);
      readable.on("error", rej);

      readable.on("close", () => {
        res();
      });
    });
  }

  read(from: fs.PathLike): Promise<T> {
    return new Promise((res, rej) => {
      const _reader = fs.createReadStream(from);
      let data = "";

      _reader.on("data", (chunk) => {
        data += chunk;
      });

      _reader.on("error", rej);
      // console.log(through);
      _reader.on("close", () => res(JSON.parse(data)));
    });
  }
}

export class JsonSerializable<T> implements Serializable<T> {
  serialize(obj: T): string {
    return JSON.stringify(obj);
  }

  deserialize(string: string): T {
    return JSON.parse(string);
  }
}
