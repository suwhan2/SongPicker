import { TextProps } from "../shared/Types"

const Text72 = (props: TextProps) => {
  return (
    <p className="text-7xl font-pyeongchang font-bold" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>{props.text}</p>
  )
}

export default Text72