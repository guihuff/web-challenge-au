export function numberInMoney(n: number) {
  const value = n.toString().split(".");
  if (value[1] && value[1].length === 1){
    return value[0]+","+value[1]+"0"
  } else if (value[1] && value[1].length === 2) {
      return value[0]+","+value[1]
  } else if (value[1] && value[1].length > 2) {
    return value[0]+",.."
  } else {
    return value[0]+",00"
  }
}