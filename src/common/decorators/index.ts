import { Transform } from 'class-transformer';

export function ToBoolean(): (target: any, key: string) => void {
  return Transform(({ obj, key }) => {
    return (
      obj[key] === 'true' ||
      obj[key] === true ||
      obj[key] === 1 ||
      obj[key] === '1'
    );
  });
}
