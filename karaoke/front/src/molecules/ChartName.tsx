import Text36 from "../atoms/Text36"
import { TextProps } from "../shared/Types"

const ChartName = (props: TextProps) => {
  return (
    <div className="flex w-[462px] h-16 rounded-box border-2 border-solid border-white justify-center items-center text-[#80F9C6] bg-black/60">
        <Text36 text={props.text}/>
    </div>
  )
}

export default ChartName