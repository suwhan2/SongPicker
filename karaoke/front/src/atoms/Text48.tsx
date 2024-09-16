type TextProps = {
    text: string
}

const Text48 = (props: TextProps) => {
  return (
    <p className="text-5xl">{props.text}</p>
  )
}

export default Text48