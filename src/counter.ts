export function setupCounter(element: HTMLElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    const label = `Count is ${counter}`
    if (element.tagName.toLowerCase() === 'zap-button') {
      element.setAttribute('label', label)
    } else {
      element.innerHTML = label
    }
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}
