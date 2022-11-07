import { createWriteStream } from "fs";
import fetch from "node-fetch";
import stream from "stream";

export async function download(url: string, options?: RequestInit | any) {
  // return fetch(url, options);
  return fetch(url, options);
}

/**
 * Download the file from url and create a stream pipe to stream file
 *
 * @param url an url to get data
 * @param dest the destination to stream the file to
 * @returns a promise resolve the response
 */
export async function downloadIntoDestination(
  url: string,
  dest: string,
  requestOptions?: RequestInit | any,
  bufferOptions?: BufferEncoding | stream.StreamOptions<any>
) {
  return fetch(url, requestOptions).then((response) => {
    const destinationOutputStream = createWriteStream(dest, bufferOptions);
    response.body.pipe(destinationOutputStream);

    return response;
  });
}
