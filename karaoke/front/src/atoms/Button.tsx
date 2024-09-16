type ButtonProps = {
  text: string;
};

const Button = (props: ButtonProps) => {
  return (
    <div
      className="btn w-[320px] h-14 rounded-[10px] bg-gradient-to-r from-blue to-[#991571] border-none shadow font-pyeongchang text-3xl text-white font-thin"
    >
      {props.text}
    </div>
  );
};

export default Button;
