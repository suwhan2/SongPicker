type PayModalButtonProps = {
    text: string,
    bgColor: string
}

const PayModalButton = (props: PayModalButtonProps) => {
  return (
    <div className="btn w-56 h-20" style={{background:props.bgColor}}>
        {props.text}
    </div>
  )
}

export default PayModalButton