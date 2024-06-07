export function jsxJoin(array: JSX.Element[], str: string) {
  return array.length > 0
    ? array.reduce((result, item) => (
        <>
          {result}
          {str}
          {item}
        </>
      ))
    : null
}
