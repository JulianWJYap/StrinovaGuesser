import { promises as fs } from 'fs';

interface GetImageProps{
  imageName: string
  jsonUrl: string
}

export async function getImageURL( Props: GetImageProps ){
  const { jsonUrl } = Props;

  const file = await fs.readFile(process.cwd() + jsonUrl, 'utf8');
  const data = JSON.parse(file);

  return data;
}